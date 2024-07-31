type ValidationResult =
  | { valid: true; data: { name: string; description: string; deadline: Date } }
  | { valid: false; message: string };

export function validateFormData(formData: FormData): ValidationResult {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const date = formData.get('date') as string;
  const time = formData.get('time') as string;

  if (typeof name !== 'string' || name.length < 3) {
    return { valid: false, message: 'Name must be longer' };
  }

  if (typeof description !== 'string' || description.length > 150) {
    return { valid: false, message: 'Description must not be more than 150 characters' };
  }

  if (!date || !time) {
    return { valid: false, message: 'Date and time must be provided' };
  }

  const deadline = new Date(`${date} ${time}`);

  if (isNaN(deadline.getTime())) {
    return { valid: false, message: 'Invalid date or time format' };
  }

  if (deadline < new Date()) {
    return { valid: false, message: 'Deadline must be in the future' };
  }

  return { valid: true, data: { name, description, deadline } };
}
