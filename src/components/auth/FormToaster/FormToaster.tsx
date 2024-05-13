import OutlineCheckCircleIcon from '@/components/icons/OutlineCheckCircleIcon';
import OutlineExclamationCircleIcon from '@/components/icons/OutlineExclamationCircleIcon';
import OutlineExclamationTriangleIcon from '@/components/icons/OutlineExclamationTriangleIcon';
import OutlineInformationCircleIcon from '@/components/icons/OutlineInformationCircleIcon';
import clsxWithMerge from '@/helpers/clsx-with-merge';

interface FormToasterProps {
  state?: 'success' | 'error' | 'warning' | 'info' | '';
  message?: string;
}

export default function FormToaster({ message, state }: FormToasterProps) {
  if (!message || !state) return null;

  let textColor = 'text-error';
  let bgColor = 'bg-error/15';
  let iconColor = 'text-error';
  let icon = (
    <OutlineExclamationTriangleIcon
      className={clsxWithMerge('w-5 h-5', iconColor)}
    />
  );

  switch (state) {
    case 'success':
      textColor = 'text-success';
      bgColor = 'bg-success/15';
      iconColor = 'text-success';
      icon = (
        <OutlineCheckCircleIcon
          className={clsxWithMerge('w-5 h-5', iconColor)}
        />
      );
      break;
    case 'warning':
      textColor = 'text-warning';
      bgColor = 'bg-warning/15';
      iconColor = 'text-warning';
      icon = (
        <OutlineExclamationCircleIcon
          className={clsxWithMerge('w-5 h-5', iconColor)}
        />
      );
      break;
    case 'info':
      textColor = 'text-info';
      bgColor = 'bg-info/15';
      iconColor = 'text-info';
      icon = (
        <OutlineInformationCircleIcon
          className={clsxWithMerge('w-5 h-5', iconColor)}
        />
      );
      break;
    default:
      textColor = 'text-error';
      bgColor = 'bg-error/15';
      iconColor = 'text-error';
      icon = (
        <OutlineExclamationTriangleIcon
          className={clsxWithMerge('w-5 h-5', iconColor)}
        />
      );
      break;
  }

  return (
    <div
      className={clsxWithMerge(
        'flex items-center gap-x-2 p-2 text-xs rounded-md',
        textColor,
        bgColor,
      )}
    >
      {icon}
      <p>{message}</p>
    </div>
  );
}
