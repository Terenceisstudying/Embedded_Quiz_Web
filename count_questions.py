import json

with open('src/data/quiz_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for quiz in data:
    print(f"{quiz['topic']}: {len(quiz['questions'])} questions")

total = sum(len(q['questions']) for q in data)
print(f"\nTotal: {total} questions")
