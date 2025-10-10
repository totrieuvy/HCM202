import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const TextToSpeech = ({ text, autoPlay = false }) => {
    const [isPaused, setIsPaused] = useState(false);
    const [utterance, setUtterance] = useState(null);
    const [voice, setVoice] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(text);

        // Cấu hình giọng nói tiếng Việt
        const voices = synth.getVoices();
        const vietnameseVoice = voices.find(v => v.lang.includes('vi'));
        if (vietnameseVoice) {
            u.voice = vietnameseVoice;
        }

        u.lang = 'vi-VN';
        u.rate = 0.9; // Tốc độ đọc (0.1 - 10)
        u.pitch = 1; // Cao độ giọng (0 - 2)
        u.volume = 1; // Âm lượng (0 - 1)

        u.onstart = () => setIsPlaying(true);
        u.onend = () => {
            setIsPlaying(false);
            setIsPaused(false);
        };
        u.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            setIsPlaying(false);
        };

        setUtterance(u);
        setVoice(vietnameseVoice);

        return () => {
            synth.cancel();
        };
    }, [text]);

    const handlePlay = () => {
        const synth = window.speechSynthesis;

        if (isPaused) {
            synth.resume();
            setIsPaused(false);
        } else {
            synth.speak(utterance);
        }
    };

    const handlePause = () => {
        const synth = window.speechSynthesis;
        synth.pause();
        setIsPaused(true);
    };

    const handleStop = () => {
        const synth = window.speechSynthesis;
        synth.cancel();
        setIsPlaying(false);
        setIsPaused(false);
    };

    return (
        <ButtonGroup size="sm" className="mt-2">
            <Button
                variant="outline-primary"
                onClick={handlePlay}
                disabled={isPlaying && !isPaused}
            >
                <i className="bi bi-play-fill"></i> {isPaused ? 'Tiếp tục' : 'Đọc'}
            </Button>
            <Button
                variant="outline-warning"
                onClick={handlePause}
                disabled={!isPlaying || isPaused}
            >
                <i className="bi bi-pause-fill"></i> Tạm dừng
            </Button>
            <Button
                variant="outline-danger"
                onClick={handleStop}
                disabled={!isPlaying}
            >
                <i className="bi bi-stop-fill"></i> Dừng
            </Button>
        </ButtonGroup>
    );
};

export default TextToSpeech;
