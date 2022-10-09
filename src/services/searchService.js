import * as htppRequest from '~/utils/htppRequest';

export const search = async (q, type = 'less') => {
    try {
        const res = await htppRequest.get('users/search', {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {}
};
