function calculate_gpa() {
    var middle = $('iframe');
    var frame = middle.contents().find('iframe');
    var a = frame.contents().find(".student-grade-table");
    var b = a.children("tbody");
    var courses = b.children("tr");
    var course;
    var grades = [];
    var credits = [];
    var info, grade, credit, sum, sum_credit;
    sum_credit = 0;
    sum = 0;
    for (var i = 0; i < courses.length; i++) {
        course = courses[i];
        info = course.children;
        grade = parseFloat(info[4].textContent);
        credit = parseFloat(info[3].textContent);
        grades.push(grade);
        credits.push(credit);
        if (!isNaN(grade)) {
            sum_credit += credit;
            sum += grade * credit;
        }
    }
    var gpa = sum / sum_credit;
    console.log("Your gpa is:" + gpa);

    var label = document.createElement("label");
    label.setAttribute("style", "font-size:20px");
    label.setAttribute("id", "cal-gpa");
    var textNOde = document.createTextNode("GPA:" + gpa.toFixed(3));
    label.appendChild(textNOde);

    var parent = middle.contents().find('#search-form').children()[0];
    var child = middle.contents().find('#cal-gpa')[0];

    if (child) parent.removeChild(child);
    parent.appendChild(label);
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.greeting == "114514") {
            setTimeout("calculate_gpa()", 500);
        }
    });
