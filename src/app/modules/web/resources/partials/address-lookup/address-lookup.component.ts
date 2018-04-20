import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AddressResult } from '../../../models/address/address-result.model';
import { FormControl } from '@angular/forms';
import { AddressDetail } from '../../../models/address/address-detail.model';

@Component({
    selector: 'app-address-lookup',
    templateUrl: './address-lookup.component.html',
    styleUrls: ['./address-lookup.component.scss']
})
export class AddressLookupComponent implements OnInit
{
    @Input() search: FormControl;
    @Output() addressFound: EventEmitter<AddressDetail> = new EventEmitter();
    results: Array<AddressResult> = [];
    container: string = "";
    lastRetreivedAddress: AddressDetail;
    selectedResultId: string = null;

    constructor(private apiService: ApiService) {}

    ngOnInit()
    {
        this.search
            .valueChanges
            .debounceTime(400)
            .subscribe((value) => {
                if(this.lastRetreivedAddress && this.lastRetreivedAddress.PostalCode ==  value)
                    this.lastRetreivedAddress = undefined;
                else
                    this.getResults();
            });

        //clearing
        window.addEventListener("click", () => {
            this.results = [];
            this.lastRetreivedAddress = undefined;
            this.container = "";
        })
    }

    getResults()
    {
        this.apiService
            .searchAddresses(this.search.value, this.container)
            .map(results => results.results.map(result => new AddressResult(result)))
            .subscribe((results: Array<AddressResult>) => {
                console.log(results);
                this.results = results;
            })
    }

    onItemChosen(item: AddressResult)
    {
        if(item.Type != "Address")
        {
            this.results = [];
            this.container = item.id;
            this.getResults();
        }
        else
        {
            this.apiService
                .getAddress(item.id)
                .map(result => new AddressDetail(result))
                .subscribe((address: AddressDetail) => {
                    this.container = "";
                    this.lastRetreivedAddress = address;
                    this.results = [];
                    this.addressFound.emit(address);
                });
        }
    }
}
