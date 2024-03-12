import { ReactNode, useState } from "react";
import "../App.css";

type PositionT = "top" | "bottom" | "left" | "right";
type ColorT = "red" | "green" | "blue";

const COLORS: ColorT[] = ["red", "blue", "green"];
const POSITIONS: PositionT[] = ["top", "bottom", "left", "right"];

type CountInfoT = {
  value: number;
  colorIndex: number;
};

type CountInfoProps = {
  data: CountInfoT;
  helpTexts: string[];
};

const CountInfo = (props: CountInfoProps) => {
  const { data, helpTexts } = props;

  console.log("RERENDER COUNT INFO");

  return (
    <div style={{ color: COLORS[data.colorIndex] ?? "black" }}>
      Count: {data.value}
      <div>
        {helpTexts.map((item) => {
          return <div>{item}</div>;
        })}
      </div>
    </div>
  );
};

const Circle = () => {
  console.log("RERENDER CIRCLE");

  return <div className="circle" />;
};

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
};

const Button = (props: ButtonProps) => {
  const { onClick, children } = props;

  console.log("RERENDER BUTTON");

  return (
    <div className="button" onClick={onClick}>
      {children}
    </div>
  );
};

export const Block1 = () => {
  const [countInfo, setCountInfo] = useState<CountInfoT>({
    value: 0,
    colorIndex: 0,
  });
  const [position, setPosition] = useState<number>(0);
  const [rotate, setRotate] = useState<boolean>(false);

  const texts = ["Use optimization", "I believe in you"];

  return (
    <div className="main">
      <div className="content">
        <div className="buttons">
          <Button
            onClick={() => {
              setCountInfo({ ...countInfo, value: countInfo.value + 1 });
            }}
          >
            Add
          </Button>
          <Button
            onClick={() => {
              setTimeout(() => {
                setCountInfo({
                  ...countInfo,
                  value: countInfo.value * 2,
                });
              }, 2000);
            }}
          >
            X2 (delay)
          </Button>
          <Button
            onClick={() => {
              setCountInfo({
                ...countInfo,
                colorIndex: (countInfo.colorIndex + 1) % COLORS.length,
              });
            }}
          >
            Change Color
          </Button>
        </div>
        <CountInfo data={countInfo} helpTexts={texts} />
      </div>
      <div className="divider" />
      <div className={`content ${POSITIONS[position]}`}>
        <div className="buttons">
          <Button
            onClick={() => {
              setPosition((position + 1) % POSITIONS.length);
            }}
          >
            Change Position
          </Button>
          <Button
            onClick={() => {
              setRotate(!rotate);
            }}
          >
            Rotate
          </Button>
        </div>
        <div className="circleBlock">
          {rotate ? (
            <>
              <div>Circle</div>
              <Circle />
            </>
          ) : (
            <>
              <Circle />
              <div>Circle</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
