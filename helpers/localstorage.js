
export default LocalDatabase;

function LocalDatabase(name) {
    this.name = name;
}

LocalDatabase.prototype.set = function(data) {
    localStorage.setItem(this.name, JSON.stringify(data));
    return true;
}

LocalDatabase.prototype.get = function() {
    var data = localStorage.getItem(this.name);
    return JSON.parse(data);
}

LocalDatabase.prototype.remove = function() {
    localStorage.removeItem(this.name);
    return true;
}

LocalDatabase.prototype.setOrMerge = function(data) {
    //get document
    let date = new Date();
    let thisMonth = (date.getMonth() + 1).toString() + date.getFullYear().toString();
    let today = date.getDate();
    
    let targetType, newFinance, dailyFinanceSchema;

    //grab finance type
    if (data["type"] == "Spend") {
        targetType = "spendings"
    } else if (data["type"] == "Earn") {
        targetType = "earnings"
    }
    //build the new finance
    newFinance = {amount: data["amount"], comment: data["comment"]};

    //each day finance schema
    dailyFinanceSchema = {
        day: today,
        earnings: [],
        spendings: []
    }


    this.name = thisMonth;

    let oldData = this.get();
   
    if (!oldData) {
        //build new document and create new
        dailyFinanceSchema[targetType].push(newFinance);
        return this.set([dailyFinanceSchema]);
    }

    let todayDoc, index;
    todayDoc = oldData.find(function(doc, i) {
        if (doc.day == today) {
            index = i;
            return true;
        }
    })

    if (todayDoc) {
        // modify today doc and update
        todayDoc[targetType].push(newFinance);
        oldData[index] = todayDoc;
        return this.set(oldData);
    }

    //build today doc
    dailyFinanceSchema[targetType].push(newFinance);
    oldData.push(dailyFinanceSchema);
    return this.set(oldData); 
}