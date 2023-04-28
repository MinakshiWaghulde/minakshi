/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api, wire } from "lwc";
import LightningModal from 'lightning/modal';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';
import saveQuote from '@salesforce/apex/QuoteController.saveQuote';


const FIELDS = ['Quote__c.StartDate__c', 'Quote__c.EndDate__c'];

export default class AdjustQuotePrice extends LightningElement {
  adjustedAmountLabel = "Adjusted Amount";
  adjustedAmount = 0;
  @api recordId;
  startDate;
  endDate;
  quoteData;

  /* Method to get the quote details on load */
  @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredRecord({ error, data }) {
      if (data) {
        this.quoteData = data;
        this.startDate = this.quoteData.fields.StartDate__c.value;
        this.endDate = this.quoteData.fields.EndDate__c.value;
        this.adjustedAmount = this.quoteData.sObj.TotalQuotedAmount__c;
      } else if (error) {
          console.error(error);
      }
    }

  closeModal() {
    const closeEvent = new CustomEvent('closemodal');
    this.dispatchEvent(closeEvent);
  }

  onChangeAmount(event){
    this.adjustedAmount = event.target.value;
  }

  /* Method to save update quote amount */
  handleAdjustQuoteSave(event){
    saveQuote({ quoteId: this.recordId, startDate: this.startDate, endDate: this.endDate, totalQuotedAmount: this.adjustedAmount })
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

}
