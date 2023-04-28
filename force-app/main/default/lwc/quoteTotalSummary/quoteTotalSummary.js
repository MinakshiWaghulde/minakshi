/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, track, api } from "lwc";

export default class QuoteTotalSummary extends LightningElement {
    @api recordId;
    @track displayAdjustQuotePriceCmp = false;

    handleAdjustQuote() {
        // open the adjust quote price modal dialog
        this.displayAdjustQuotePriceCmp = true;
        //const element = this.template.querySelector('div[data-name="Modalbox"]');
        //element.classList.remove('slds-fade-in-open');
    }

    handleCloseModal() {
        this.displayAdjustQuotePriceCmp = false;
    }
}
