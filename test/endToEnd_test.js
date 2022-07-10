const fs = require('fs');
const path = require("path");


var baseDir = path.resolve("./")
describe("sc",()=>{
    it('tc',()=>{

        browser.url("https://www.loadmatch.com/login.cfm");
        $('[name="contact_username"]').setValue("tboston");
        $(`[name="contact_password"]`).setValue("terainc");
        $(`[name="login_user"]`).click();
        var dataJson  = fs.readFileSync(baseDir+'/testdata/All_port_urls.json', 'utf8');
        const dataObject = JSON.parse(dataJson);
        const dataObjectEntries = Object.entries(dataObject); 
        const dataMap = new Map(dataObjectEntries);
        var detailsMap =  new Map()
        var jsonmap =  new Map()
        var i = 0;
        for (let [key, value] of dataMap.entries()) {
          i= i+1
          browser.url(key);
          
          let ele_company_details = $(`(((//tbody)[1]//tr)[2]/td)[2]`);
         
          if (ele_company_details.isDisplayed() === false){
            dataMap.delete(key)
            continue;
          }
          let city_state_arr = value.split("-")
          let city = city_state_arr[0].trim()
          let state =city_state_arr[1].trim()
          jsonmap.set("City",city)
          jsonmap.set("State",state)
          $(`((//tbody)[1]//tr/td)[24]`).waitForDisplayed()
          jsonmap.set("Company Details",ele_company_details.getText());
          jsonmap.set(
            "Tollfree:\\nPhone:\\nFax",
            $(`((//tbody)[1]//tr/td)[6]`).getText()
          );
         
          // let emailId = $(`((//tbody)[1]//tr/td)[9]`).getText().split("\n")[1]
         
          // jsonmap.set(
          //  "Website",
          //   emailId
          // );
         // console.log($(`((//tbody)[1]//tr/td)[11]`).getText())
          jsonmap.set(
            "Contacts",
            $(`((//tbody)[1]//tr/td)[12]`).getText().split("\n")[1]
          );
        //  console.log($(`((//tbody)[1]//tr/td)[14]`).getText())
          jsonmap.set(
           "Company Description",
            $(`((//tbody)[1]//tr/td)[15]`).getText()
          );
        //  console.log($(`((//tbody)[1]//tr/td)[17]`).getText())
          jsonmap.set(
            "Authority",
            $(`((//tbody)[1]//tr/td)[18]`).getText()
          );
       //   console.log($(`((//tbody)[1]//tr/td)[20]`).getText())
          // jsonmap.set(
          //   $(`((//tbody)[1]//tr/td)[20]`).getText(),
          //   $(`((//tbody)[1]//tr/td)[21]`).getText()
          // );
          jsonmap.set(
           "Ingate / Outgate",
            $(`((//tbody)[1]//tr/td)[24]`).getText()
          );
        //  console.log($(`((//tbody)[1]//tr/td)[26]`).getText())
          jsonmap.set(
          "States Served",
            $(`((//tbody)[1]//tr/td)[27]`).getText()
          );
         // console.log($(`((//tbody)[1]//tr/td)[29]`).getText())
          jsonmap.set(
           "Drayage Service",
            $(`((//tbody)[1]//tr/td)[30]`).getText()
          );
         // console.log($(`((//tbody)[1]//tr/td)[32]`).getText())
          jsonmap.set(
           "Assets",
            $(`((//tbody)[1]//tr/td)[33]`).getText()
          );
          var jsonobj = Object.fromEntries(jsonmap);
          var jsonobj_str = JSON.stringify(jsonobj)
          detailsMap.set(key,jsonobj_str) 
         if (i===50){
           break;
         }
        }
        var detailsMap_json = Object.fromEntries(detailsMap);
        var detailsMap_json_str = JSON.stringify(detailsMap_json);
        fs.writeFileSync(baseDir+"/testdata/loadMatchDetailsApi.json",detailsMap_json_str)

        const dataMap_allport_json = Object.fromEntries(dataMap);
        var dataMap_allport_json_str = JSON.stringify(dataMap_allport_json);
        fs.writeFileSync(
          baseDir + "/testdata/All_port_urls.json",
          dataMap_allport_json_str
        );
    })

})


