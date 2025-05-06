import { useState, useEffect } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Input } from '../Input/Input';

export function formatDate(date: Date | string): string {

    const dateObj = typeof date === 'string' ? new Date(date) : date;

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

interface DatePickerProps {
  onChange?: (date: Date) => void;
  label: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
}

export default function DatePicker({
  onChange,
  label,
  required = false,
  error = false,
  errorMessage = 'Preencha o campo com a data do evento',
  placeholder = '12/02/2025 19:30'
}: DatePickerProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);
  const [displayValue, setDisplayValue] = useState(formatDate(date));
  const [isError, setIsError] = useState(error);

  useEffect(() => {
    setIsError(error);
  }, [error]);

  function handleDateChange(event: DateTimePickerEvent, selectedDate: Date | undefined) {
    if (selectedDate) {
      const updatedDate = new Date(selectedDate);
      
      if (mode === 'date') {
        updatedDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        setDate(updatedDate);
        setMode('time');
        
        if (Platform.OS === 'ios') {
          setShow(true);
        } else {
          setShow(false);
          setTimeout(() => setShow(true), 100);
        }
      } else {
        updatedDate.setHours(selectedDate.getHours(), selectedDate.getMinutes());
        setDate(updatedDate);
        setShow(false);
        
        const formattedDate = formatDate(updatedDate);
        setDisplayValue(formattedDate);
        setIsError(false);
        
        if (onChange) {
          onChange(updatedDate);
        }
      }
    } else {
      setShow(false);
    }
  }

  function showPicker() {
    setShow(true);
    setMode('date');
  }

  return (
    <>
      {show && (
        <DateTimePicker
          value={date}
          locale="pt-BR"
          mode={mode}
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleDateChange}
        />
      )}
      
      <Input.Root isError={isError} style={{ marginTop: 10 }}>
        <Input.Label required={required}>{label}</Input.Label>
        <TouchableOpacity onPress={showPicker} activeOpacity={0.7}>
          <Input.Input
            value={displayValue}
            placeholder={placeholder}
            editable={false} 
          />
        </TouchableOpacity>

          <Input.ErrorMessage style={{ marginTop: 6 }}>
            {errorMessage}
          </Input.ErrorMessage>
      </Input.Root>
    </>
  );
}