
   //----------------------------------------------------

//rough work
var countriesmap = actions.get_all_countries_map()
var port_map = new Map();
var port_mapofmap = new Map();
 for (let [key, value] of countriesmap.entries()) {
   browser.url(value);
   let newadded_carrier = $(`//*[text()='Newest Added Carriers']`);
   if (newadded_carrier.isDisplayed()) {
     newadded_carrier.click();
   }
   let select_port = $(`(//a[text()='Port'])[2]`);
   if (select_port.isDisplayed()) {
     select_port.click();
   }
   let carriers = $$(`//*[text()='detail']//parent::a`);
   carriers.forEach((e) => {
     port_map.set(
       e.getAttribute("href").split("(")[1].split(")")[0].replace("'", ""),
       ""
     );
   });
   break;
 }
//----------------------------------------------------
var all_port_urls = []
for (let [k, v] of port_map.entries()) {
all_port_urls.push(k)
}
fs.writeFileSync(baseDir+"/testdata/All_port_urls.json",JSON.stringify(all_port_urls))
//----------------------------------------------------
 var detailsMap = [];
 var jsonmap = new Map();
 for (let [key, value] of port_map.entries()) {
   browser.url(key);
   let text_trs = $$(`(//tbody)[1]//tr`);
   jsonmap.set(text_trs[0].getText(), text_trs[1].getText());
   jsonmap.set(
     $(`((//tbody)[1]//tr/td)[5]`).getText(),
     $(`((//tbody)[1]//tr/td)[6]`).getText()
   );
   jsonmap.set(
     $(`((//tbody)[1]//tr/td)[8]`).getText(),
     $(`((//tbody)[1]//tr/td)[9]`).getText()
   );
   jsonmap.set(
     $(`((//tbody)[1]//tr/td)[11]`).getText(),
     $(`((//tbody)[1]//tr/td)[12]`).getText()
   );
   jsonmap.set(
     $(`((//tbody)[1]//tr/td)[14]`).getText(),
     $(`((//tbody)[1]//tr/td)[15]`).getText()
   );
   jsonmap.set(
     $(`((//tbody)[1]//tr/td)[17]`).getText(),
     $(`((//tbody)[1]//tr/td)[18]`).getText()
   );
   jsonmap.set(
     $(`((//tbody)[1]//tr/td)[20]`).getText(),
     $(`((//tbody)[1]//tr/td)[21]`).getText()
   );
   jsonmap.set(
     $(`((//tbody)[1]//tr/td)[23]`).getText(),
     $(`((//tbody)[1]//tr/td)[24]`).getText()
   );
   jsonmap.set(
     $(`((//tbody)[1]//tr/td)[26]`).getText(),
     $(`((//tbody)[1]//tr/td)[27]`).getText()
   );
   jsonmap.set(
     $(`((//tbody)[1]//tr/td)[29]`).getText(),
     $(`((//tbody)[1]//tr/td)[30]`).getText()
   );
   jsonmap.set(
     $(`((//tbody)[1]//tr/td)[32]`).getText(),
     $(`((//tbody)[1]//tr/td)[33]`).getText()
   );
   const jsonobj = Object.fromEntries(jsonmap);
   var jsonobj_str = JSON.stringify(jsonobj)
   detailsMap.push(jsonobj_str)
 }
 
  fs.writeFileSync(baseDir+"/testdata/loadMatchDetailsApi.json",JSON.stringify(detailsMap))
 