import random
import string


def generate_employee_id():
    alphabet = string.ascii_lowercase
    digits = string.digits
    return ''.join(random.choices(alphabet, k=2)).upper() + ''.join(random.choices(digits, k=4))
