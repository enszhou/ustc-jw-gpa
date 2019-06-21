function calculate_gpa() {
    var middle = $('iframe');
    var frame = middle.contents().find('iframe');
    var h3s = frame.contents().find("h3");
    var a = frame.contents().find(".student-grade-table");
    var tbodys = a.children("tbody");
    var info, gpa, weight_average, sum_credit;
    var info, gpa_all, weight_average_all, sum_credit_all = 0;
    var sum_credit1_all = 0, sum_credit2_all = 0, sum1_all = 0, sum2_all = 0;
    var parent;
    for (var i = 0; i < tbodys.length; i++) {
        info = calculate_semester(tbodys[i]);
        gpa = info[0] / info[1];
        weight_average = info[2] / info[3];
        sum_credit = info[4];
        var str = '学分:' + sum_credit + '&nbsp;&nbsp;&nbsp;&nbsp;GPA:' + gpa.toFixed(3) + '&nbsp;&nbsp;&nbsp;&nbsp;加权平均:' + weight_average.toFixed(2);

        parent = h3s[i].parentNode;
        var label = document.createElement('label');
        label.innerHTML = str;
        label.setAttribute('style', 'background:yellow');
        parent.appendChild(label);

        sum1_all += info[0];
        sum_credit1_all += info[1];
        sum2_all += info[2];
        sum_credit2_all += info[3];
        sum_credit_all += sum_credit;
    }
    gpa_all = sum1_all / sum_credit1_all;
    weight_average_all = sum2_all / sum_credit2_all;

    var str = '总学分:' + sum_credit_all + '&nbsp;&nbsp;&nbsp;&nbsp;GPA:' + gpa_all.toFixed(3) + '&nbsp;&nbsp;&nbsp;&nbsp;加权平均:' + weight_average_all.toFixed(2);
    var label = document.createElement("label");
    label.setAttribute("style", "font-size:15px;background:yellow;margin-top:10px;");
    label.setAttribute("id", "cal-gpa");
    label.innerHTML = str;

    var parent = middle.contents().find('.top-bar')[0];
    var child = middle.contents().find('#cal-gpa')[0];
    //if (child) parent.removeChild(child);
    //parent.appendChild(label);
    if (!child || tbodys.length > 1) {
        if (child) parent.removeChild(child);
        parent.setAttribute('style', 'display:block');
        parent.appendChild(label);
    }


}

function calculate_semester(tbody) {
    var point, grade, credit, gpa, weight_average;
    var sum_credit, sum_credit1, sum_credit2, sum1, sum2;
    var courses = tbody.children;
    sum_credit = 0;
    sum_credit1 = 0;
    sum_credit2 = 0;
    sum1 = 0;
    sum2 = 0;

    for (var i = 0; i < courses.length; i++) {
        course = courses[i];
        info = course.children;
        credit = parseFloat(info[3].textContent);
        grade = parseFloat(info[4].textContent);
        point = parseFloat(info[5].textContent);
        if (!isNaN(grade)) {
            sum_credit1 += credit;
            sum1 += grade * credit;
        }
        if (!isNaN(point)) {
            sum_credit2 += credit;
            sum2 += point * credit;
        }
        sum_credit += credit;
    }
    //gpa = sum1 / sum_credit1;
    //weight_average = sum2 / sum_credit2;
    return [sum1, sum_credit1, sum2, sum_credit2, sum_credit];
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.greeting == "114514") {
            setTimeout("calculate_gpa()", 500);
        }
    });
