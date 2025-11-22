#!/usr/bin/env python3
"""
Convert Embedded_quiz_bank.md to quiz_data.json format
"""

import json
import re
from pathlib import Path

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
        question_text = line.strip('*').strip()
        
        # Skip empty questions (just in case)
        if not question_text:
            i += 1
            continue
        
        # Check for IMAGE placeholder (look ahead skipping blanks)
        j = i + 1
        found_image = False
        while j < len(lines):
            next_line = lines[j].strip()
            if not next_line:
                j += 1
                continue
            if next_line == 'IMAGE':
                found_image = True
                j += 1 # Consume IMAGE line
            break # Found non-empty line (IMAGE or Option)
        
        if found_image:
            question_text += " (See image)"
            i = j
        else:
            i += 1
            
        # Read options
        options = []
        blank_lines_count = 0
        is_fill_in_blank = False
        
        while i < len(lines):
            opt_line = lines[i].strip()
            
            if not opt_line:
                blank_lines_count += 1
                # If we see 2 or more consecutive blank lines, assume end of question
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
            
            # Check if it's a standard option (text followed by optional "1")
            # OR if it's a fill-in-the-blank answer (just text, no "1" but treated as correct)
            # We distinguish based on whether ANY option in the group has a "1" marker later.
            # BUT, for the specific user request, "push" and "pop" are just text lines.
            # If a question has NO options with "1" explicitly, we might treat it as fill-in-the-blank?
            # Actually, the user said: "key in push for the first blank and pop for the next blank".
            # The markdown has:
            # push
            # pop
            #
            # And for 30000000:
            # 30000000
            
            # Let's parse everything as options first.
            option_match = re.match(r'^(\d+\.\s*)?(.+?)(\s+1)?$', opt_line)
            if option_match:
                option_text = option_match.group(2).strip()
                is_correct_marker = option_match.group(3) is not None
                
                # Clean up option text
                option_text = option_text.rstrip('1').strip()
                
                if option_text and option_text != 'IMAGE':
                    options.append({
                        "text": option_text,
                        "isCorrect": is_correct_marker
                    })
            
            i += 1
        
        # Only add question if it has options
        if options:
            # Determine type
            # If NO option is marked as correct, assume it's a fill-in-the-blank question
            # where ALL provided "options" are actually the correct answers in order.
            has_explicit_correct = any(opt["isCorrect"] for opt in options)
            
            if not has_explicit_correct:
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
                correct_count = sum(1 for opt in options if opt["isCorrect"])
                multi_select = correct_count > 1
            
            # Generate question ID
            question_id = f"{current_topic}_{len(current_questions) + 1}"
            
            current_questions.append({
                "id": question_id,
                "question": question_text,
                "options": options,
                "explanation": "",
                "multiSelect": multi_select,
                "type": question_type
            })
    
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
    
    print(f"Reading quiz bank from: {markdown_file}")
    
    # Parse and convert
    quizzes = parse_quiz_bank(markdown_file)
    
    print(f"Parsed {len(quizzes)} topics")
    for quiz in quizzes:
        print(f"  - {quiz['topic']}: {len(quiz['questions'])} questions")
    
    # Write JSON
    print(f"\nWriting to: {output_file}")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(quizzes, f, indent=2, ensure_ascii=False)
    
    print("✓ Conversion complete!")

if __name__ == "__main__":
    main()
