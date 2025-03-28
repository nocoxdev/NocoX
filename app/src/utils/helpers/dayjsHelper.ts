import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few secs',
    m: 'a min',
    mm: '%d mins',
    h: 'an h',
    hh: '%d h',
    d: 'a d',
    dd: '%d d',
    M: 'a m',
    MM: '%d m',
    y: 'a y',
    yy: '%d y',
  },
});

export function toNow(date: string, withoutSuffix: boolean = false) {
  return dayjs().to(dayjs(date), withoutSuffix);
}

export function fromNow(date: string, withoutSuffix: boolean = false) {
  return dayjs(date).fromNow(withoutSuffix);
}

export function formatDate(
  date: string | number | dayjs.Dayjs | Date | null | undefined,
  template: string | undefined = 'YYYY-MM-DD HH:mm:ss',
) {
  return dayjs(date).format(template);
}
