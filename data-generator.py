import csv
import random
import names


def generate_row():
  ages = list(range(18, 71))
  genders = ["Man", "Woman", "Other"]
  paygrades = list(range(2, 13))
  job_titles = [
    "Engineer", "Teacher", "Nurse", "Doctor", "Programmer", "Artist", "Chef",
    "Driver", "Clerk", "Salesperson"
  ]
  academics = [True, False]
  full_time = [True, False]
  ethnicities = ["Black", "Asian", "Mixed", "Other", "Unknown", "White"]
  disabilities = [
    "Specific Learning Difficulty",
    "Long-standing illness or health condition", "Mental Health Condition",
    "Physical impairment or mobility issues",
    "Deaf or serious hearing impairment"
  ]
  sexual_orientations = ["Hetrosexual", "Bisexual", "Gay", "Other"]

  gender = random.choice(genders)
  if gender == "Man":
    name = names.get_full_name(gender='male')
  else:
    name = names.get_full_name(gender='female')

  return [
    name.split(' ')[0],
    name.split(' ')[1],
    random.choice(ages),
    gender,
    random.choice(paygrades),
    random.choice(job_titles),
    random.choice(academics),
    random.choice(full_time),
    random.choice(ethnicities),
    random.choice(disabilities),
    random.choice(sexual_orientations),
  ]


with open('dummy_data.csv', 'w', newline='') as csvfile:
  fieldnames = [
    "firstname", "surname", "age", "gender", "pay grade", "job title",
    "academic", "full time", "ethnicity", "disability", "sexual orientation"
  ]
  writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

  writer.writeheader()
  for _ in range(100):
    row = generate_row()
    writer.writerow(dict(zip(fieldnames, row)))
