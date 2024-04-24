import { LightningElement, api } from 'lwc';

export default class CustomDataTable extends LightningElement {
    // for data-table data
    @api data = [];
    @api columns = [];

    // for pagination
    @api pageSize = 10;
    @api totalRecords = 0;
    currentPage = 1;
    // default value for the pagination button labels but setting it to API so dev's can reuse and update label
    // when necessary upon project needs
    @api buttonRightLabel = 'Next';
    @api buttonLeftLabel = 'Previous';

    get totalPages() {
        return Math.ceil(this.totalRecords / this.pageSize);
    }

    get disablePrev() {
        return this.currentPage == 1;
    }

    get disableNext() {
        return this.currentPage == this.totalPages;
    }

    // handles previous page navigation for datatable
    handlePrevious = (event) => {this.createEvent('previous')};
    handleNext = (event) => {this.createEvent('next')}

    createEvent = (actionType) => {
        const paginationEvent = new CustomEvent("getpaginationaction", {detail: actionType});
        this.dispatchEvent(paginationEvent);
    }
}