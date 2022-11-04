import { useEffect, useState } from "react";

const useGroupByField = (array: any[], field?: string, field2?: string) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let data = [...array];
    const categories = [];

    if (field2) {
      data.forEach((bet) => {
        const catArr = data.filter(
          (b) => b[field][field2] === bet[field][field2]
        );
        if (catArr.length > 0) {
          categories.push(catArr);
        }
        data = data.filter((b) => b[field][field2] !== bet[field][field2]);
      });
    } else {
      data.forEach((bet) => {
        const catArr = data.filter((b) => b[field] === bet[field]);
        if (catArr.length > 0) {
          categories.push(catArr);
        }
        data = data.filter((b) => b[field] !== bet[field]);
      });
    }

    setData(categories);
  }, [array, field, field2]);

  return data;
};

export default useGroupByField;
