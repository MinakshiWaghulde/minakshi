/*
* Controller class for custom object Quote__c. 
* 
* Provus Coding offline assessment 2023
* Copyright (c) 
* Author: Minakshi
* Date: 26/04/2023
* 
* This class is to handle different operations like View, Edit, Save 
* on Quote__c object records.
*  
*/


public with sharing class QuoteController {
    public QuoteController() {

    }

    /* Method to get the Quote details based on the id */
    @AuraEnabled(cacheable=true)
    public static QuoteDto getQuote(Id quoteId) {
        Quote__c getQuoteRecord = [Select Id, Name, StartDate__c, EndDate__c, TotalQuotedAmount__c 
                                    From Quote__c
                                    Where Id =: quoteId
                                    WITH SECURITY_ENFORCED];
        QuoteDto quoteDto = new QuoteDto(getQuoteRecord);
        return quoteDto;
    }

    /* Method to update the Quote details based on the id. */
    @AuraEnabled
    public static void saveQuote(Id quoteId, Date startDate, Date endDate, Decimal totalQuotedAmount){
        try {
            Quote__c quoteToUpdate = new Quote__c(Id = quoteId, StartDate__c = startDate, EndDate__c = endDate, TotalQuotedAmount__c = totalQuotedAmount);
            if(Schema.sObjectType.Quote__c.isUpdateable()){
                update quoteToUpdate;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}