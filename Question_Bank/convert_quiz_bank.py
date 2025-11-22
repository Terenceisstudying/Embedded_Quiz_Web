#!/usr/bin/env python3
"""
Convert Embedded_quiz_bank.md to quiz_data.json format
"""

import json
import re
from pathlib import Path

def get_image_for_question(question_text):
    """Map question text to image filename based on content"""
    question_lower = question_text.lower()
    
    if 'logic interface' in question_lower or 'raspberry pi gpio' in question_lower:
        return 'logic_interface.png'
    elif 'water level' in question_lower or 'capacitance to detect water' in question_lower:
        return 'water_level_sensor.png'
    elif 'detect change in a sensor' in question_lower or 'capacitor' in question_lower:
        return 'capacitor_diagram.png'
    return None

def parse_quiz_bank(markdown_file):
    """Parse the markdown quiz bank into structured data"""
    with open(markdown_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    quizzes = []
    current_topic = None
    current_questions = []
    
    lines = content.split('\n')
    i = 0
    
    while i < len(lines):
        line = lines[i].strip()
        
        if not line:
            i += 1
            continue
        
        # Detect topic headers (##### Topic Name)
        if line.startswith('#####'):
            # Save previous topic if exists
            if current_topic and current_questions:
                quizzes.append({
                    "topic": current_topic,
                    "questions": current_questions
                })
            
            # Start new topic
            current_topic = line.replace('#####', '').strip()
            current_questions = []
            i += 1
            continue
        
        # Assume any other non-empty line at this level is a question
        # (Handle both **Question** and plain Question)
        # For questions with code snippets, we need to collect all bold lines until we hit options
        question_text = line.strip('*').strip()
        
        # Skip empty questions (just in case)
        if not question_text:
            i += 1
            continue
        
        # Check if this is a bold question (starts and ends with **)
        is_bold_question = line.startswith('**') and line.endswith('**')
        
        # If it's a bold question, collect all subsequent bold lines as part of the question
        # This handles cases where code snippets are included in bold
        if is_bold_question:
            question_lines = [question_text]
            j = i + 1
            # Collect all consecutive bold lines (code snippets, etc.)
            while j < len(lines):
                next_line = lines[j].strip()
                if not next_line:
                    j += 1
                    continue
                # If next line is also bold, it's part of the question
                if next_line.startswith('**') and next_line.endswith('**'):
                    question_lines.append(next_line.strip('*').strip())
                    j += 1
                else:
                    # Not a bold line, stop collecting question text
                    break
            
            # Join all question lines with newlines
            question_text = '\n'.join(question_lines)
            i = j
        else:
            i += 1
        
        # Check for IMAGE placeholder (look ahead skipping blanks from current position)
        j = i
        found_image = False
        image_filename = None
        while j < len(lines):
            next_line = lines[j].strip()
            if not next_line:
                j += 1
                continue
            if next_line == 'IMAGE':
                found_image = True
                j += 1 # Consume IMAGE line
            break # Found non-empty line (IMAGE or Option)
        
        # Determine image filename if IMAGE placeholder found
        if found_image:
            image_filename = get_image_for_question(question_text)
            # Remove "(See image)" suffix if we're storing the image path
            if not image_filename:
                question_text += " (See image)"
            i = j
            
        # Check if this is a matching question (has "match" in question text)
        is_matching_question = 'match' in question_text.lower()
        
        # Read options
        options = []
        blank_lines_count = 0
        is_fill_in_blank = False
        
        while i < len(lines):
            opt_line = lines[i].strip()
            
            if not opt_line:
                blank_lines_count += 1
                # For matching questions, allow more blank lines between pairs
                # For other questions, if we see 2 or more consecutive blank lines, assume end of question
                if is_matching_question:
                    # For matching, break only on 4+ consecutive blank lines (since pairs have 3 blank lines between them)
                    if blank_lines_count >= 4:
                        break
                else:
                    if blank_lines_count >= 2:
                        break
                i += 1
                continue
            
            blank_lines_count = 0
            
            # Stop if we hit a topic header or a new bold question
            if opt_line.startswith('#####'):
                break
            if opt_line.startswith('**') and opt_line.endswith('**'):
                break
            
            # Check if this is a ranking question (has "sort" in question text)
            is_ranking_question = 'sort' in question_text.lower()
            
            # For matching questions, parse as "symbol description" pairs
            if is_matching_question:
                # Parse format: "symbol description" (e.g., "& Bitwise AND")
                # Split on first space to separate symbol from description
                parts = opt_line.split(None, 1)  # Split on whitespace, max 1 split
                if len(parts) == 2:
                    symbol = parts[0].strip()
                    description = parts[1].strip()
                    if symbol and description:
                        options.append({
                            "symbol": symbol,
                            "description": description,
                            "isCorrect": True  # All pairs are correct by definition
                        })
                i += 1
                continue
            
            # For ranking questions, extract rank first before other parsing
            rank = None
            if is_ranking_question:
                # Try to extract a number at the end of the line (e.g., "Desk-checking 1" -> rank: 1)
                rank_match = re.search(r'\s+(\d+)\s*$', opt_line)
                if rank_match:
                    rank = int(rank_match.group(1))
                    # Remove the rank number from the line for further parsing
                    opt_line = re.sub(r'\s+\d+\s*$', '', opt_line).strip()
            
            # Let's parse everything as options first.
            # Match numbered list items (e.g., "1. Option text") but NOT decimal numbers (e.g., "0.104 ms")
            # The key difference: numbered list items have a space after the period, decimals don't
            # Also handle options that end with " 1" as correct marker (e.g., "1 1" -> text: "1", correct: true)
            option_match = re.match(r'^(\d+\.\s+)?(.+?)(\s+1)?$', opt_line)
            if option_match:
                option_text = option_match.group(2).strip()
                is_correct_marker = option_match.group(3) is not None
                
                # For ranking questions, ignore correct markers (we use rank instead)
                if is_ranking_question:
                    is_correct_marker = False
                else:
                    # Only strip trailing "1" if there's a space before it AND it's not the correct marker
                    # If is_correct_marker is True, the "1" is already separated in group 3, so don't strip it
                    # If is_correct_marker is False but option ends with "1", check if it's part of the text
                    if not is_correct_marker and option_text.endswith('1'):
                        # Check if it's a standalone "1" or part of a number (like "41" or "1" as text)
                        # Only strip if there's whitespace before the "1" (indicating it might be a marker)
                        # But since group 3 didn't match, it means there's no space, so keep it
                        pass  # Don't strip - the "1" is part of the option text
                
                if option_text and option_text != 'IMAGE':
                    option_data = {
                        "text": option_text,
                        "isCorrect": is_correct_marker
                    }
                    if rank is not None:
                        option_data["rank"] = rank
                    options.append(option_data)
            
            i += 1
        
        # Only add question if it has options
        if options:
            # Check if this is a matching question
            is_matching_question = 'match' in question_text.lower() and any('symbol' in opt for opt in options if isinstance(opt, dict))
            
            # Check if this is a ranking question
            is_ranking_question = 'sort' in question_text.lower() or any('rank' in opt for opt in options if isinstance(opt, dict) and 'rank' in opt)
            
            # Determine type
            if is_matching_question:
                question_type = "matching"
                multi_select = False
            elif is_ranking_question and any('rank' in opt for opt in options):
                question_type = "ranking"
                multi_select = False
            # If NO option is marked as correct, assume it's a fill-in-the-blank question
            # where ALL provided "options" are actually the correct answers in order.
            elif not any(opt.get("isCorrect", False) for opt in options):
                # This is a fill-in-the-blank question
                # The 'options' list actually contains the correct answers.
                # We'll store them differently or mark them all as correct for internal logic?
                # Better to add a 'type' field.
                question_type = "fill_in_the_blank"
                # For fill-in-the-blank, the "options" are the correct answers.
                for opt in options:
                    opt["isCorrect"] = True
                multi_select = False 
            else:
                question_type = "multiple_choice"
                correct_count = sum(1 for opt in options if opt.get("isCorrect", False))
                multi_select = correct_count > 1
            
            # Generate question ID
            question_id = f"{current_topic}_{len(current_questions) + 1}"
            
            question_data = {
                "id": question_id,
                "question": question_text,
                "options": options,
                "explanation": "",
                "multiSelect": multi_select,
                "type": question_type
            }
            
            # Add image path if available
            if image_filename:
                question_data["image"] = image_filename
            
            current_questions.append(question_data)
    
    # Add last topic
    if current_topic and current_questions:
        quizzes.append({
            "topic": current_topic,
            "questions": current_questions
        })
    
    return quizzes

def main():
    # Paths
    script_dir = Path(__file__).parent
    markdown_file = script_dir.parent / "docs" / "Embedded_quiz_bank.md"
    output_file = script_dir.parent / "src" / "data" / "quiz_data.json"
    total_questions = 0
    print(f"Reading quiz bank from: {markdown_file}")
    
    # Parse and convert
    quizzes = parse_quiz_bank(markdown_file)
    
    print(f"Parsed {len(quizzes)} topics")
    for quiz in quizzes:
        print(f"  - {quiz['topic']}: {len(quiz['questions'])} questions")
        total_questions += len(quiz['questions'])
    print(f"Total questions: {total_questions}")
    # Write JSON
    print(f"\nWriting to: {output_file}")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(quizzes, f, indent=2, ensure_ascii=False)
    
    print("Conversion complete!")

if __name__ == "__main__":
    main()
