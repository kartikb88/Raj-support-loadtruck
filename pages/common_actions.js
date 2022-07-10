const fs = require("fs");
const path = require("path");
var baseDir = path.resolve("./");
class actions {
  get ele_username() {
    return $('[name="contact_username"]');
  }
  get ele_password() {
    return $('[name="contact_password"]');
  }

  get ele_submit_Btn() {
    return $(`[name="login_user"]`);
  }

  get ele_Intermodal_Directory_link() {
    return $("//*[text()='Intermodal Directory']");
  }
  get ele_Drayag_truckers_ingate_link() {
    return $(
      "//*[text()='Drayage truckers by ingate / outgate city metro']//parent::a"
    );
  }

  get ele_Newest_Added_Carriers_link() {
    return $(`//*[text()='Newest Added Carriers']`);
  }

  login_(username, password) {
    this.ele_username.setValue(username);
    this.ele_password.setValue(password);
    this.ele_submit_Btn.click();
    browser.pause(100);
  }

  click_Drayag_truck_link() {
    this.ele_Drayag_truckers_ingate_link.click();
  }

  click_Intermodal_Directory_link() {
    this.ele_Intermodal_Directory_link.click();
  }

  click_Newest_Added_Carriers_link() {
    this.ele_Newest_Added_Carriers_link.click();
  }
  //=====================================================================================
  get_all_countries_map() {
    var countriesmap = new Map();
    for (let i = 1; i < 6; i++) {
      var table_1 = $$(
        `(//td[text()='Not sure which city metro? View ']//following::table)[${i}]//td/a`
      );
      table_1.forEach((element) => {
        countriesmap.set(element.getText(), element.getAttribute("href"));
      });
    }
    return countriesmap;
  }

  read_countries_JSON_to_map() {
    var dataJson = fs.readFileSync(
      baseDir + "/testdata/All_countries_urls.json",
      "utf8"
    );
    const dataObject = JSON.parse(dataJson);
    const dataObjectEntries = Object.entries(dataObject);
    const dataMap = new Map(dataObjectEntries);
    return dataMap;
  }

  write_Countries_To_JSON() {
    //get all the countries Map
    var countries_map = this.get_all_countries_map();
    //convert map into json format
    const countriesmap_json = Object.fromEntries(countries_map);
    var countriesmap_json_str = JSON.stringify(countriesmap_json);
    fs.writeFileSync(
      baseDir + "/testdata/All_countries_urls.json",
      countriesmap_json_str
    );
  }

  //=====================================================================================

  save_all_new_ports_to_json() {
    var countries_map = this.read_countries_JSON_to_map();
    var existing_ports_map = this.read_all_ports_Json_to_map();
    for (let [key, value] of countries_map.entries()) {
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
        var port_url = e
          .getAttribute("href")
          .split("(")[1]
          .split(")")[0]
          .replace("'", "");
          if (existing_ports_map.has(port_url)) {
        } else {
          existing_ports_map.set(port_url, key);
        }
      
      });
    }
     const existing_ports_json = Object.fromEntries(existing_ports_map);
     var existing_ports_json_str = JSON.stringify(existing_ports_json);
     fs.writeFileSync(
       baseDir + "/testdata/All_port_urls.json",
       existing_ports_json_str
     );

  }

  read_all_ports_Json_to_map() {
    var dataJson = fs.readFileSync(
      baseDir + "/testdata/All_port_urls.json",
      "utf8"
    );
    const dataObject = JSON.parse(dataJson);
    const dataObjectEntries = Object.entries(dataObject); 
    const dataMap = new Map(dataObjectEntries);
    return dataMap;
  }

  update_port_url(staledKey) {
    var existing_ports_map = this.read_all_ports_Json_to_map();
    existing_ports_map.delete(staledKey);
    return existing_ports_map;
    //Add code to save the update JSON before returning string
  }
}

module.exports = new actions();
