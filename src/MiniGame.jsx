import React, { useState, useEffect } from "react";
import "./css/MiniGame.css";

const questions = [
  {
    question:
      "Hồ Chí Minh rời bến cảng Nhà Rồng để tìm đường cứu nước vào năm nào?",
    options: ["1905", "1911", "1920", "1941"],
    answer: "1911",
  },
  {
    question:
      "Hồ Chí Minh đã gửi Bản Yêu sách của nhân dân An Nam đến Hội nghị Versailles vào năm nào?",
    options: ["1911", "1917", "1919", "1925"],
    answer: "1919",
  },
  {
    question:
      "Quốc gia châu Á đầu tiên Hồ Chí Minh đặt chân đến trong hành trình tìm đường cứu nước là?",
    options: ["Nhật Bản", "Trung Quốc", "Ấn Độ", "Thái Lan"],
    answer: "Nhật Bản",
  },
  {
    question: "Hồ Chí Minh tham gia sáng lập Đảng Cộng sản Pháp vào năm nào?",
    options: ["1919", "1920", "1925", "1930"],
    answer: "1920",
  },
  {
    question:
      "Tổ chức chính trị do Hồ Chí Minh thành lập năm 1941 để lãnh đạo phong trào cách mạng Việt Nam là?",
    options: [
      "Đông Dương Cộng sản Đảng",
      "Việt Nam Quốc dân Đảng",
      "Mặt trận Việt Minh",
      "Hội Việt Nam Cách mạng Thanh niên",
    ],
    answer: "Mặt trận Việt Minh",
  },
  {
    question:
      "Hồ Chí Minh từng bị chính quyền thực dân Anh bắt giam tại đâu vào năm 1931?",
    options: ["Pháp", "Trung Quốc", "Liên Xô", "Hong Kong"],
    answer: "Hong Kong",
  },
  {
    question:
      "Tư tưởng chính trị nào có ảnh hưởng lớn nhất đến con đường cách mạng của Hồ Chí Minh?",
    options: [
      "Chủ nghĩa dân chủ tư sản",
      "Chủ nghĩa Marx-Lenin",
      "Chủ nghĩa quân chủ",
      "Chủ nghĩa bảo thủ",
    ],
    answer: "Chủ nghĩa Marx-Lenin",
  },
  {
    question:
      "Hồ Chí Minh trở về Việt Nam lần đầu sau hơn 30 năm bôn ba vào năm nào?",
    options: ["1925", "1930", "1941", "1945"],
    answer: "1941",
  },
  {
    question:
      "Tờ báo nào do Hồ Chí Minh sáng lập để tuyên truyền cách mạng trong giai đoạn hoạt động ở Pháp?",
    options: ["Nhân Dân", "Le Paria", "Thanh Niên", "Cờ Giải Phóng"],
    answer: "Le Paria",
  },
  {
    question:
      "Hồ Chí Minh đã đọc bản Tuyên ngôn Độc lập của Việt Nam vào ngày nào?",
    options: ["30/4/1945", "2/9/1945", "19/8/1945", "7/5/1954"],
    answer: "2/9/1945",
  },
];

const MiniGame = () => {
  const [time, setTime] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!submitted) {
      const timer = setInterval(() => setTime((prev) => prev + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [submitted]);

  const handleAnswer = (qIndex, option) => {
    setAnswers({ ...answers, [qIndex]: option });
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });
    setScore(correct);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setScore(0);
    setTime(0);
    setSubmitted(false);
  };

  return (
    <div
      className="minigame-container"
      style={{ backgroundImage: `url('../src/assets/quizz.webp')` }}
    >
      <div className="minigame-header">
        <p>
          <strong>Minigame:</strong> 30 năm tìm đường cứu nước của Chủ tịch Hồ
          Chí Minh
        </p>
        <p>
          Time Elapsed:{" "}
          <b>
            {String(Math.floor(time / 60)).padStart(2, "0")}:
            {String(time % 60).padStart(2, "0")}
          </b>
        </p>
        <p>No. of questions: {questions.length}</p>
      </div>

      <div className="minigame-content">
        {questions.map((q, i) => (
          <div key={i} className="question-block">
            <p>
              <span className="number">{i + 1}</span> {q.question}
            </p>
            {q.options.map((opt, j) => {
              let status = null;
              if (submitted) {
                if (opt === q.answer) status = "correct";
                if (answers[i] === opt && opt !== q.answer) status = "wrong";
              }

              return (
                <label key={j} className={`option ${status || ""}`}>
                  <input
                    type="radio"
                    name={`q-${i}`}
                    value={opt}
                    disabled={submitted}
                    checked={answers[i] === opt}
                    onChange={() => handleAnswer(i, opt)}
                  />
                  {opt}
                  {status === "correct" && <span className="mark">✓</span>}
                  {status === "wrong" && <span className="mark">✗</span>}
                </label>
              );
            })}
          </div>
        ))}
      </div>

      {!submitted ? (
        <button className="btn-submit" onClick={handleSubmit}>
          Nộp bài
        </button>
      ) : (
        <div className="result">
          <p>
            ✅ Bạn đúng {score}/{questions.length} câu.
          </p>
          <button className="btn-reset" onClick={handleReset}>
            Chơi lại
          </button>
        </div>
      )}
    </div>
  );
};

export default MiniGame;
