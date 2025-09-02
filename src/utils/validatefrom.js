export function validateForm(newCourse, setError) {
    let newerrors = {};

    // Basic required field validation
    if (!newCourse.code) {
      newerrors.code = "กรุณากรอกรหัสนักศึกษา";
    } else if (newCourse.code.length !== 13) {
      newerrors.code = "รหัสนักศึกษาต้องมี 13 หลัก";
    }

    if (!newCourse.name) {
      newerrors.name = "กรุณากรอกชื่อนักศึกษา";
    }

    if (!newCourse.classLevel) {
      newerrors.classLevel = "กรุณากรอกระดับชั้น";
    }

    if (!newCourse.course) {
      newerrors.course = "กรุณากรอกรายวิชา";
    }

    // Score validation
    if (!newCourse.listening) {
      newerrors.listening = "กรุณากรอกคะแนน Listening";
    } else if (isNaN(newCourse.listening) || newCourse.listening < 0 || newCourse.listening > 100) {
      newerrors.listening = "คะแนน Listening ต้องเป็นตัวเลขระหว่าง 0-100";
    }

    if (!newCourse.reading) {
      newerrors.reading = "กรุณากรอกคะแนน Reading";
    } else if (isNaN(newCourse.reading) || newCourse.reading < 0 || newCourse.reading > 100) {
      newerrors.reading = "คะแนน Reading ต้องเป็นตัวเลขระหว่าง 0-100";
    }

    if (!newCourse.writing) {
      newerrors.writing = "กรุณากรอกคะแนน Writing";
    } else if (isNaN(newCourse.writing) || newCourse.writing < 0 || newCourse.writing > 100) {
      newerrors.writing = "คะแนน Writing ต้องเป็นตัวเลขระหว่าง 0-100";
    }

    if (!newCourse.total) {
      newerrors.total = "กรุณากรอกคะแนน Total";
    } else if (isNaN(newCourse.total) || newCourse.total < 0 || newCourse.total > 300) {
      newerrors.total = "คะแนน Total ต้องเป็นตัวเลขระหว่าง 0-300";
    } else {
      // Check if total matches sum of individual scores
      const calculatedTotal = parseInt(newCourse.listening || 0) + parseInt(newCourse.reading || 0) + parseInt(newCourse.writing || 0);
      if (parseInt(newCourse.total) !== calculatedTotal) {
        newerrors.total = `คะแนน Total ต้องเท่ากับ ${calculatedTotal} (Listening + Reading + Writing)`;
      }
    }

    if (!newCourse.passingScore) {
      newerrors.passingScore = "กรุณากรอกคะแนน Passing Score";
    } else if (isNaN(newCourse.passingScore) || newCourse.passingScore < 0 || newCourse.passingScore > 300) {
      newerrors.passingScore = "คะแนน Passing Score ต้องเป็นตัวเลขระหว่าง 0-300";
    }

    if (!newCourse.testLevel) {
      newerrors.testLevel = "กรุณากรอก test level";
    }

    if (!newCourse.testCalendar) {
      newerrors.testCalendar = "กรุณากรอกวันที่สอบ";
    } else {
      const selectedDate = new Date(newCourse.testCalendar);
      const today = new Date();
      if (selectedDate > today) {
        newerrors.testCalendar = "วันที่สอบไม่สามารถเป็นวันในอนาคตได้";
      }
    }

    if (!newCourse.notes) {
      newerrors.notes = "กรุณากรอกหมายเหตุ";
    }

    if (!newCourse.savedBy) {
      newerrors.savedBy = "กรุณากรอกชื่อผู้บันทึก";
    }

    if (!newCourse.status) {
      newerrors.status = "กรุณากรอกสถานะ";
    } else if (!['ผ่าน', 'ไม่ผ่าน'].includes(newCourse.status)) {
      newerrors.status = "สถานะต้องเป็น 'ผ่าน' หรือ 'ไม่ผ่าน' เท่านั้น";
    }

    setError(newerrors);
    return Object.keys(newerrors).length > 0;
  }