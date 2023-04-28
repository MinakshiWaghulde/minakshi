/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */


import { LightningElement, wire, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getQuote from '@salesforce/apex/QuoteController.getQuote';
import saveQuote from '@salesforce/apex/QuoteController.saveQuote';

export default class EditQuote extends LightningElement {
  @api recordId;
  @track quoteData;
  @track name;
  @track startDate;
  @track endDate;
  @track totalQuotedAmount;

  /* Method to get the quote details on load */
  @wire(getQuote, { quoteId: '$recordId' })
  wiredQuote({ error, data }) {
    if (data) {
        this.quoteData = data;
        this.name = this.quoteData.sObj.Name;
        this.startDate = this.quoteData.sObj.StartDate__c;
        this.endDate = this.quoteData.sObj.EndDate__c;
        this.totalQuotedAmount = this.quoteData.sObj.TotalQuotedAmount__c;
    } else if (error) {
        console.error(error);
    }
}

  handleStartDateChange(event) {
    this.startDate = event.target.value;
  }

  handleEndDateChange(event) {
    this.endDate = event.target.value;
  }

   /* Method to save update quote amount */
  handleSave(event){
    saveQuote({ quoteId: this.recordId, startDate: this.startDate, endDate: this.endDate, totalQuotedAmount: this.totalQuotedAmount })
      .then(() => {
        console.log('Quote updated successfully');
        this.showToast('Save Quote','Saved Quote Details', 'success');
      })
      .catch(error => {
        console.error(error);
        this.showToast('Save Quote',error, 'error');
      });
  }

  showToast(title, message, variant) {
    const event = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant
    });
    this.dispatchEvent(event);
  }
  renderedCallback() {}
}
