import {Observable} from 'rxjs/Observable';

export class FakeApiService {

    searchForPriorityUsersFake(searchString: string): Observable<any> {
        return new Observable(observer => {

            setTimeout(() => {
                observer.next({
                    'carers': [
                        {
                            '_id': '5a6b1413599b6f3c8c7eaa8b',
                            'carer': {
                                'surname': 'Whats',
                                'first_name': 'Mark'
                            }
                        },
                        {
                            '_id': '5a6b1413599b6f3c8c7eaa8c',
                            'carer': {
                                'surname': 'Neary',
                                'first_name': 'Paul'
                            }
                        },
                        {
                            '_id': '5a6b1413599b6f3c8c7eaa8g',
                            'carer': {
                                'surname': 'ciaśniej',
                                'first_name': 'W Szudlach'
                            }
                        }
                    ]
                });
            }, 200);

            setTimeout(() => {
                observer.complete();
            }, 2000);
        });
    }
}
