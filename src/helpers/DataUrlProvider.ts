
export interface DataUserInfo {
    url: string;
    pageSize: number;
}

export default class DataUrlProvider {
    static async get(itemName: string, itemNumber: number): Promise<DataUserInfo> {
        return fetch(`data/${itemName}/info.json`)
        .then(res => res.json())
        .then(async info => {
            const total: number = info.total;
            const fileNamePattern: string = info.fileNamePattern;
            var start = 1;
            var end = start + 99;
            let fileName = fileNamePattern.replace("<start>", "" + start).replace("<end>", "" + end);
            while (start < total) {
                let inBetween = start <= itemNumber && itemNumber <= end;
                if (inBetween) {
                    fileName = fileNamePattern.replace("<start>", "" + start).replace("<end>", "" + end);
                    break;
                }
                start += 100;
            }
            return {
                url: `data/${itemName}/${fileName}`,
                pageSize: info.pageSize
            };
        });
    }
}
