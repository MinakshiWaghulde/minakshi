public with sharing class QuoteDto extends BaseDto {
  @AuraEnabled
  public Date endDate;

  @AuraEnabled
  public Date startDate;

  public QuoteDto() {
  }

  public QuoteDto(Quote__c quote) {
    super(quote);
    //this.startDate = quote.StartDate__c;
    this.endDate = quote.EndDate__c;
  }

  public override SObject refreshSo() {
    return null;
  }
}
