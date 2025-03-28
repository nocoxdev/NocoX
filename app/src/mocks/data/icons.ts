import { http, HttpResponse } from 'msw';
import type { BaseResponse } from '@/services/responses';
import type { IconValueType } from '@/types';

// import { faker } from "@faker-js/faker";
// import qs from "qs";

const item1: IconValueType = {
  name: '2fa',
  title: '2fa',
  content:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M0 0h24v24H0z" stroke="none"/><path d="M7 16H3l3.47-4.66A2 2 0 103 9.8M10 16V8h4M10 12h3M17 16v-6a2 2 0 014 0v6M17 13h4"/></svg>',
};

const item2: IconValueType = {
  name: '123',
  title: '123',
  content:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l2 -2v8" /><path d="M9 8h3a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h3" /><path d="M17 8h2.5a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1 -1.5 1.5h-1.5h1.5a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1 -1.5 1.5h-2.5" /></svg>',
};

const item3: IconValueType = {
  name: 'chevron-down',
  title: 'Chevron Down',
  content:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em"  stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg>',
};

const item4: IconValueType = {
  name: 'star',
  title: 'Star',
  content:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>',
};

const item5: IconValueType = {
  name: 'star-filled',
  title: 'Star Filled',
  content:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  width="24" height="24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" /></svg>',
};

// const items = Array.from({ length: 100 }, () => ({ ...item1, name: faker.string.uuid() }));

const icons = http.get('Urls.GET_ICON_LIST', () => {
  // const { url } = request;

  // const params = qs.parse(url.split("?")[1]);

  // const { index, size, keywords } = params;

  // const start = Number(index) * Number(size);

  // const icons = items.slice(start, start + Number(size));

  const data: BaseResponse<IconValueType[]> = {
    success: true,
    message: '',
    data: [item1, item2, item3, item4, item5],
  };

  return HttpResponse.json(data);
});

export default icons;
