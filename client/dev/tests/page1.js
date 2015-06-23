describe('page1', function(){
	it('should have title "Three Pages"', function(){
		browser.get('http://localhost:7000');

		// expect(element(by.css('.h1class')).getAttribute('value')).toEqual('boo');

		expect(browser.getTitle()).toEqual('Three Pages');
	});
});