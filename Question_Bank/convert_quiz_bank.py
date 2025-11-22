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
        
        # Detect questions (bold text with **)
        if line.startswith('**') and line.endswith('**'):
            question_text = line.strip('*').strip()
            
            # Skip empty questions
            if not question_text:
                i += 1
                continue
            
            # Read options until we hit a blank line or another question
            options = []
            i += 1
            
            # Check if this is IMAGE placeholder
            if i < len(lines) and lines[i].strip() == 'IMAGE':
                # Add image reference to question
                question_text += " (See image)"
                i += 1
            
            while i < len(lines):
                opt_line = lines[i].strip()
                
                # Stop if we hit a blank line followed by another ** or #####
                if not opt_line:
                    i += 1
                    if i < len(lines) and (lines[i].strip().startswith('**') or lines[i].strip().startswith('#####')):
                        break
                    continue
                
                if opt_line.startswith('**') or opt_line.startswith('#####'):
                    break
                
                # Parse option (text followed by optional "1" for correct answer)
                option_match = re.match(r'^(\d+\.\s*)?(.+?)(\s+1)?$', opt_line)
                if option_match:
                    option_text = option_match.group(2).strip()
                    is_correct = option_match.group(3) is not None
                    
                    # Clean up option text
                    option_text = option_text.rstrip('1').strip()
                    
                    if option_text and option_text != 'IMAGE':
                        options.append({
                            "text": option_text,
                            "isCorrect": is_correct
                        })
                
                i += 1
            
            # Only add question if it has options
            if options:
                # Determine if multi-select (more than one correct answer)
                correct_count = sum(1 for opt in options if opt["isCorrect"])
                multi_select = correct_count > 1
                
                # Generate question ID
                question_id = f"{current_topic}_{len(current_questions) + 1}"
                
                current_questions.append({
                    "id": question_id,
                    "question": question_text,
                    "options": options,
                    "explanation": "",  # No explanations in the markdown
                    "multiSelect": multi_select
                })
            
            continue
        
        i += 1
    
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
