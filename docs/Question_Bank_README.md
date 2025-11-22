# Question Bank

This folder contains the source questions for the Embedded Systems Quiz Application.

## Files

- **Embedded_quiz_bank.md** - The source of truth for all quiz questions and answers
- **convert_quiz_bank.py** - Python script to convert the markdown file to JSON format
- Images:
  - `logic_interface.png` - Voltage logic levels diagram (Raspberry Pi GPIO vs Sensor Pin)
  - `capacitor_diagram.png` - Parallel plate capacitor diagram  
  - `water_level_sensor.png` - Capacitive water level sensor diagram

## Usage

### Converting Quiz Bank to JSON

Run the conversion script to update the quiz app with the latest questions:

```bash
python Question_Bank/convert_quiz_bank.py
```

This will:
1. Parse `Embedded_quiz_bank.md`
2. Generate `src/data/quiz_data.json` with all questions
3. Automatically detect multi-select questions (multiple correct answers)

## Question Format in Markdown

Questions are organized by topic with `#####` headers:

```markdown
##### Topic Name

**Question text goes here?**

Option 1
Option 2
Option 3 1
Option 4

**Next question?**

...
```

- Correct answers are marked with `1` at the end of the line
- Multiple `1` markers = multi-select question
- Images can be referenced with `![Alt Text](image_filename.png)`

## Topics Included

1. Introduction to Embedded Systems (17 questions)
2. Embedded C (18 questions)
3. GPIO (14 questions)
4. Digital Communication (10 questions)
5. Interrupts (10 questions)
6. Timers & PWM (8 questions)
7. ADC (10 questions)
8. Embedded Operating System (10 questions)
9. Testing (20 questions)
10. Optimization (10 questions)
11. Sensor Fusion (14 questions)

**Total: ~141 questions**
