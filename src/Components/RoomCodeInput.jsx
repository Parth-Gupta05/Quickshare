import React, { useRef, useState, useEffect } from 'react';

function RoomCodeInput({
  length = 6,
  onComplete,
  onChange,
  value = '',
  setParentCode,
}) {
  const inputRefs = useRef([]);
  const [code, setCode] = useState(Array(length).fill(''));

  // ✅ Safely update parent AFTER render
  useEffect(() => {
    if (setParentCode) {
      setParentCode(code);
    }
  }, [code, setParentCode]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
    if (inputRefs.current.length < length) {
      for (let i = inputRefs.current.length; i < length; i++) {
        inputRefs.current[i] = React.createRef();
      }
    }
  }, [length]);

  useEffect(() => {
    if (value && value.length === length) {
      setCode(value.split(''));
    }
  }, [value, length]);

  const handleChange = (e, index) => {
    const newCode = [...code];
    const char = e.target.value.slice(0, 1);

    if (char === '') newCode[index] = '';
    else if (/^[a-zA-Z0-9]$/.test(char)) newCode[index] = char.toUpperCase();
    else return;

    setCode(newCode);
    onChange?.(newCode.join(''));

    if (char !== '' && index < length - 1) {
      inputRefs.current[index + 1].current.focus();
    }

    if (newCode.every(c => c !== '') && onComplete) {
      onComplete(newCode.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      e.preventDefault();
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      onChange?.(newCode.join(''));
      inputRefs.current[index - 1].current.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].current.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData('text')
      .slice(0, length)
      .split('');

    const newCode = Array(length).fill('');
    pasteData.forEach((char, i) => {
      if (/^[a-zA-Z0-9]$/.test(char)) {
        newCode[i] = char.toUpperCase();
      }
    });

    setCode(newCode);
    onChange?.(newCode.join(''));

    const lastIndex = Math.min(pasteData.length - 1, length - 1);
    inputRefs.current[lastIndex]?.current?.focus();

    if (newCode.every(c => c !== '') && onComplete) {
      onComplete(newCode.join(''));
    }
  };

  return (
    <div
      className="flex gap-2 sm:gap-3 md:gap-4 justify-center items-center flex-wrap sm:flex-nowrap"
      onPaste={handlePaste}
    >
      {code.map((char, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={char}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={inputRefs.current[index]}
          className="
            w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
            rounded-md sm:rounded-lg
            bg-transparent border border-gray-600 focus:border-white
            text-xl sm:text-2xl md:text-3xl
            text-center font-bold text-orange-600
            outline-none transition-all
            focus:scale-105 focus:ring-2 focus:ring-orange-500
          "
        />
      ))}
    </div>
  );
}

export default RoomCodeInput;
