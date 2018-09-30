import FormItem from '@/components/Item';

interface Img {
    file: string;
    group: string;
    ext: string;
}

interface Report {
    type: string;
    data: FormItem[];
}

export { Img, Report };
