import s from "./style.module.scss";
import { Author } from "../../types";
import arrayShuffle from "array-shuffle";

type Props = { children: React.ReactNode };

const Layout: React.FC<Props> = ({ children }) => {
  let headerAuthors: any = [];

  Object.entries(Author).map((item) => {
    if (item[1] === "Christopher T.") return;
    headerAuthors = [...headerAuthors, { key: item[0], name: item[1] }];
  });

  headerAuthors = arrayShuffle(headerAuthors).slice(0, 13);

  return (
    <div>
      <div className={s.header}>
        <div className={s.avatarCloud}>
          {headerAuthors.map((x: any, i: any) => (
            <div key={i} className={s.avatar}>
              <div className={s.avatarInner}>
                <img
                  src={process.env.PUBLIC_URL + `/avatars/${x.key}.jpg`}
                  alt={x.name}
                />
              </div>
            </div>
          ))}
        </div>
        <h1>For The Boys</h1>
      </div>

      <div className={s.wrapper}>{children}</div>
    </div>
  );
};

export default Layout;
