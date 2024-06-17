import { getBackendUrl } from '@/utils';

import { http, HttpResponse } from 'msw';

import paths from './paths';

export default Object.entries(paths).map(([route, data]) => {
    const [method, path] = route.split(' ');
    const m = method.toLowerCase() as keyof typeof http;
    return http[m](getBackendUrl(path), ({ request, params, cookies }) => {
      return HttpResponse.json(data);
    });
});