import { MonthActiveDay, MonthGridItem } from 'core/types/calendar.type';
import { UserEvent } from 'core/types/events.type';
import { Control, FieldErrors, FieldValues, UseFormHandleSubmit, UseFormRegister, UseFormReset } from 'react-hook-form';

export interface UseArrowButtonsControlResponse {
  dateText: string;
  handlePrevButtonClick: () => void;
  handleNextButtonClick: () => void;
}

export interface UseDatePickerDataResponse {
  isMonthsPickerActive: boolean;
  handleDisplayMonths: () => void;
  handleDisplayYears: () => void;
  month: number | null;
  year: number | null;
  handlePickMonth: (month: number) => void;
  handlePickYear: (year: number) => void;
  handleConfirm: () => void;
}

export interface UseHandleUserEventResponse {
  selectedEvent: UserEvent | null;
  open: () => void;
  isOpen: boolean;
  close: () => void;
  handleEventClick: (userEvent: UserEvent) => void;
  handleSubmitForm: (values: FieldValues) => void;
  handleDeleteEvent: (id: string) => void;
}

export interface UseModalResponse {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export interface UseMonthDaysDataResponse {
  daysList: MonthGridItem[];
  selectedDay: MonthActiveDay | null;
  handleDayClick: (dayData: MonthActiveDay) => void;
}

export interface UseUserEventFormResponse {
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues, any>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  errors: FieldErrors<FieldValues>;
  getErrorMessage: (errors: FieldErrors<FieldValues>, name: string) => string;
  reset: UseFormReset<FieldValues>;
  handleClearTitle: () => void;
  handleReturnExistingDescription: () => void;
  subtitle: string | undefined;
  isDisabledSubmitButton: boolean;
  title: string;
}
