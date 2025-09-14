import { useEffect, useState } from "react";
// eslint-disable-next-line
import { motion } from "motion/react";
import { Box } from "@mui/material";

/**
 *
 * @param {{
 * text: string | string[],
 * style?: import("@mui/material/Typography").TypographyProps,
 * speed?: number,
 * delay?: number,
 * repeat?: boolean,
 * stopBlinking?: boolean
 * }} params
 * @returns {JSX.Element}
 */
export default function Typewriter({
  text = "Hello, world!",
  style,
  speed = 100,
  delay = 0,
  repeat = false,
  stopBlinking = false,
}) {
  const [displayText, setDisplayText] = useState("");
  const [finished, setFinished] = useState(false);

  const shouldStop = stopBlinking && finished;

  useEffect(() => {
    let textArr;
    Array.isArray(text) ? (textArr = [...text]) : (textArr = [text]);
    let forward = true;
    let i = 0;
    let j = 0;
    let interval;

    const start = () => {
      interval = setInterval(() => {
        let currText = textArr[i];
        forward ? j++ : j--;
        if (j === currText.length) forward = false;
        else if (j === 0) {
          forward = true;
          i++;
        }
        if (!repeat && i === textArr.length - 1 && !forward) {
          setFinished(true);
          clearInterval(interval);
        }
        if (i === textArr.length) i = 0;
        setDisplayText(currText.slice(0, j));
      }, speed);
    };

    const timeout = setTimeout(start, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <Box sx={{ ...style }}>
      <span style={{ marginRight: "0.5ch" }}>{displayText}</span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: shouldStop ? [0, 0, 0, 0] : [0, 0, 1, 1] }}
        transition={{
          duration: 1,
          repeat: shouldStop ? 0 : Infinity,
          times: [0, 0.5, 0.5, 1],
          ease: "easeInOut",
          delay: delay / 1000,
        }}
        style={{
          borderLeft: "2px solid",
        }}
      />
    </Box>
  );
}
