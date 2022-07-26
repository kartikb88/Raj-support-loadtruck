const fs = require('fs');
const path = require("path");
const { default: pause } = require('webdriverio/build/commands/browser/pause');


var baseDir = path.resolve("./")
describe("sc",()=>{
    it('tc',()=>{
        browser.url("https://www.loadmatch.com/login.cfm");
        $('[name="contact_username"]').setValue("tboston");
        $(`[name="contact_password"]`).setValue("terainc");
        $(`[name="login_user"]`).click();
        var dataJson  = fs.readFileSync(baseDir+'/testdata/All_port_urls.json', 'utf8');
        var dataJson_consumed  = fs.readFileSync(baseDir+'/testdata/consumed_allPorts.json', 'utf8');
        var dataJson_deleted  = fs.readFileSync(baseDir+'/testdata/deletedJson_allPorts.json', 'utf8');

        const dataObject = JSON.parse(dataJson);
        const dataObjectEntries = Object.entries(dataObject); 
        const dataMap = new Map(dataObjectEntries);

        // consumed json object 
        const dataObject_dataJson_consumed = JSON.parse(dataJson_consumed);
        const dataObjectEntries_dataJson_consumed = Object.entries(dataObject_dataJson_consumed); 
        const dataMap_dataJson_consumed = new Map(dataObjectEntries_dataJson_consumed);

        // deleted json
        const dataObjectdataJson_deleted = JSON.parse(dataJson_deleted);
        const dataObjectEntries_dataJson_deleted = Object.entries(dataObjectdataJson_deleted); 
        const dataMap_dataJson_deleted = new Map(dataObjectEntries_dataJson_deleted);

        
        var detailsMap =  new Map()
        var jsonmap =  new Map()
        var i = 0;
        for (let [key, value] of dataMap.entries()) {
          i= i+1
          if (i>200){
            break;
          }
          browser.pause(1000)
          browser.url(key);
          let ele_company_details = $(`(((//tbody)[1]//tr)[2]/td)[2]`);
          if (ele_company_details.isDisplayed() === false){
            dataMap_dataJson_deleted.set(key,value)
            dataMap.delete(key)
            continue;
          }
          let city_state_arr = value.split("-")
          let city = city_state_arr[1].trim()
          let state =city_state_arr[0].trim()
          jsonmap.set("City",city)
          jsonmap.set("State",state)
          var rows = $$(`(//tbody)[1]//tr`)
          $(`((//tbody)[1]//tr/td)[24]`).waitForDisplayed()
          rows.forEach(row => {
                var text = row.getText().toUpperCase()
                if(text.includes('COMPANY DETAIL')){
                  jsonmap.set("Company Detail",ele_company_details.getText());

                }
                else if(text.includes("TOLLFREE:\nPHONE:\nFAX:") || text.includes('PHONE:\nFAX')){
                  jsonmap.set(
                    "Tollfree:\\nPhone:\\nFax",
                    $(`((//tbody)[1]//tr/td)[6]`).getText()
                  );
                }
               
                else if(text.includes("CONTACTS")){
                  jsonmap.set(
                    "Contacts",
                    $(`((//tbody)[1]//tr/td)[12]`.toUpperCase()).getText().split("\n")[1]
                  );
                  
                }
                else if(text.includes("COMPANY DESCRIPTION")){
                  jsonmap.set(
                    "Company Description",
                     $(`((//tbody)[1]//tr/td)[15]`.toUpperCase()).getText()
                   );
                }

                else if(text.includes("AUTHORITY")){
                  jsonmap.set(
                    "Authority",
                    $(`((//tbody)[1]//tr/td)[18]`.toUpperCase()).getText()
                  );
                }
                else if(text.includes('INGATE / OUTGATE:')){
                  jsonmap.set(
                    "Ingate / Outgate",
                     $(`((//tbody)[1]//tr/td)[24]`.toUpperCase()).getText()
                   );
                }
                else if(text.includes('STATES SERVED:')){
                  jsonmap.set(
                    "States Served",
                      $(`((//tbody)[1]//tr/td)[27]`.toUpperCase()).getText()
                    );
                }
                else if(text.includes('DRAYAGE SERVICE:')){
                  jsonmap.set(
                    "Drayage Service",
                     $(`((//tbody)[1]//tr/td)[30]`.toUpperCase()).getText()
                   );
                }
                else if(text.includes('ASSETS:')){
                  jsonmap.set(
                    "Assets",
                     $(`((//tbody)[1]//tr/td)[33]`.toUpperCase()).getText()
                   );
                }

          })

         
          var jsonobj = Object.fromEntries(jsonmap);
          var jsonobj_str = JSON.stringify(jsonobj)
          detailsMap.set(key,jsonobj_str) 

          dataMap_dataJson_consumed.set(key,value)
          dataMap.delete(key)
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

        const consumed_json = Object.fromEntries(dataMap_dataJson_consumed);
        var consumed_json_str = JSON.stringify(consumed_json);
        fs.writeFileSync(
          baseDir + "/testdata/consumed_allPorts.json",
          consumed_json_str
        );

        const deleted_json = Object.fromEntries(dataMap_dataJson_deleted);
        var deleted_json_str = JSON.stringify(deleted_json);
        fs.writeFileSync(
          baseDir + "/testdata/deletedJson_allPorts.json",
          deleted_json_str
        );
    })

})


