describe('To-do List', function() {
    beforeEach(function(){
        browser.get('http://localhost:7000');        
    });


  it('should display to-do item after it is being added', function() {
    element(by.id('toDoLink')).click();

    element(by.model('itemInput')).sendKeys('hi to browser');
    element(by.id('enterBtn')).click();
    element(by.model('itemInput')).clear();
    	
    var text = element(by.id('0')).getText();
    
    expect(text).toEqual('hi to browser');
  });

  it('item should be crossed out', function(){
    element(by.id('toDoLink')).click();

    element(by.model('itemInput')).sendKeys('hi to browser');
    element(by.id('enterBtn')).click();
    element(by.model('itemInput')).clear();
    element(by.model('item.done')).click();

    expect(element(by.id('0')).getAttribute('class')).toEqual('done-true');
    
    });

  // archive item
  it('crossed out items should be gone', function(){
    element(by.id('toDoLink')).click();

    element(by.model('itemInput')).sendKeys('hi to browser');
    element(by.id('enterBtn')).click();
    element(by.model('itemInput')).clear();
    element(by.model('item.done')).click();

    element(by.id('archiveBtn')).click();
    expect(element(by.id('0')).isPresent()).toBe(false);
  });

  // check archive list under archive tab
  it('should be able to see a list archived items', function(){
    element(by.id('toDoLink')).click();
    
    element(by.model('itemInput')).sendKeys('hi to browser');
    element(by.id('enterBtn')).click();
    element(by.model('itemInput')).clear();
    element(by.model('item.done')).click();

    element(by.model('itemInput')).sendKeys('watch an episode of Seinfield');
    element(by.id('enterBtn')).click();
    element(by.model('itemInput')).clear();

    element(by.id('archiveBtn')).click();

    element(by.id('archiveLink')).click();
    
    expect(element(by.id('0')).getText()).toEqual('hi to browser');
  });

});