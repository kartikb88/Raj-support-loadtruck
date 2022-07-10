const actions = require("../pages/common_actions.js")
const fs = require('fs');
const path = require("path");
var baseDir = path.resolve("./")
describe("test_1", () => {
  it("tc_01", () => {
    browser.url("https://www.loadmatch.com/login.cfm");
    
    actions.login_("tboston","terainc")
     actions.click_Intermodal_Directory_link()
     actions.click_Drayag_truck_link()
    //Save all the countries to json file
    actions.write_Countries_To_JSON()//-----till here it produces country wise json
  
   actions.save_all_new_ports_to_json() //--- it generates the All port json file where we have details 


  });
});
