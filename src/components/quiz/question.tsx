import { useEffect, useRef, useState } from "react";
import Button from "../ui/button";
import Container from "../ui/container";
import H2 from "../ui/headings/h2";
import Input from "../ui/inputs/input";
import { toast } from "react-hot-toast";
import { usePoints } from "@/providers/points";

interface Props {
  question: {
    id: string;
    answears: string[];
    question: string;
  };
  visible: boolean;
  addIndex: () => void;
  endQuiz: () => void;
}

export default function Question({
  question,
  visible,
  addIndex,
  endQuiz,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [helped, setHelped] = useState(false);
  const managePoints = usePoints();

  const checkAnswear = () => {
    const answear = inputRef.current?.value;
    if (!answear) {
      toast.error("nie podano odpowiedzi");
      return;
    }
    if (question.answears.includes(answear)) {
      managePoints(helped ? "HELPED" : "CORRECT", question.id);
      inputRef.current.style.borderColor = "green";
      inputRef.current.disabled = true;
      addIndex();
    } else {
      managePoints("INCORRECT", question.id);
      inputRef.current.style.borderColor = "red";
    }
  };

  const autoCheck = () => {
    if (!inputRef.current) return;
    if (inputRef.current.value.length < 1) return;
    if (question.answears.includes(inputRef.current.value)) {
      checkAnswear();
    }
  };

  const helpHandler = () => {
    setHelped(true);
  };

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    }
  }, [visible]);

  return (
    <Container
      className="lg:w-[800px] lg:h-[450px] p-4 w-full flex-col lg:bg-opacity-50 bg-opacity-0 justify-center items-center lg:gap-8 gap-4 relative"
      style={{ display: visible ? "flex" : "none" }}
    >
      <H2>{question.question}</H2>
      <Input
        ref={inputRef}
        onKeyUp={(event) =>
          event.key === "Enter" ? checkAnswear() : autoCheck()
        }
        className="lg:text-5xl lg:p-4 lg:w-[400px] w-4/5 border-2 border-transparent"
      />
      {helped && (
        <section className="absolute lg:top-12 -top-10">
          <Container
            variant="solid-dark"
            opacity="full"
          >
            długość:{" "}
            {question.answears
              .filter((answear) => answear.length > 0)
              .map((answear) => answear.length)
              .join(", ")}
          </Container>
        </section>
      )}

      <footer className="absolute flex lg:w-full gap-4 lg:scale-100 scale-75 w-fit justify-between px-2 lg:bottom-2 -bottom-8">
        <Button
          variant="ghost"
          bg="dark"
          onClick={endQuiz}
        >
          zakończ
        </Button>
        <section className="flex gap-4">
          <Button
            variant="ghost"
            bg="dark"
            onClick={helpHandler}
            disabled={helped}
            className="w-9 h-9 rounded-full flex justify-center items-center text-[24px]"
          >
            <p>?</p>
          </Button>
          <Button
            bg="light"
            onClick={checkAnswear}
          >
            sprawdź
          </Button>
        </section>
      </footer>
    </Container>
  );
}