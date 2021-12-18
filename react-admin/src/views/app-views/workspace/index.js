/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Flex from "components/shared-components/Flex";
import { Input } from 'antd';
import { Button } from 'antd';
import { Row } from 'antd';
import { Col } from 'antd';
import { Table } from 'antd';
import { Statistic } from 'antd';
import { CopyOutlined } from "@ant-design/icons";
const { TextArea } = Input;

const UserList = () => {

  // const token = useSelector(({ auth }) => auth.authToken, shallowEqual);
  const [beforeText, setBeforeText] = React.useState('');
  const [afterText, setAfterText] = React.useState('Sample text here!');
  const [beforeScore, setBeforeScore] = React.useState(0);
  const [afterScore, setAfterScore] = React.useState(0);
  const [Score, setScore] = React.useState(0);
  const [wordCount, setWordCount] = React.useState(0);
  const [condition, setCondition] = React.useState(true);
  const [table, setTable] = React.useState(false);
  const [list, setList] = useState([]);
  const [type, setType] = useState(1);
  const tableColumns = [
    {
      title: "Original Word",
      dataIndex: "origin",
      render: (_, record) => <div className="d-flex">{record.origin}</div>,
    },

    {
      title: "Suggested Word",
      dataIndex: "suggestion",
      render: (_, record) => <div>{
        !record.db ? <TextArea placeholder="Your suggestion" onChange={e => {
          let tmp = [...list];
          for (let idx = 0; idx < tmp.length; idx++)
            if (tmp[idx].id2 == record.id2)
              tmp[idx].suggestion = e.target.value == "" ? "Your suggestion" : e.target.value;
          setList(tmp);
        }} /> : <div className="d-flex">{record.suggestion}</div>}</div>,
    },

    {
      title: "Whole Sentence",
      dataIndex: "whole",
      render: (_, record) => <div>...{afterText.substring(record.index - 40 > 0 ? record.index - 40 : 0, record.index)}<span style={{ color: "red" }}>{record.origin}</span>{afterText.substring(record.index + record.origin.length, record.index + 40 + record.origin.length < afterText.length ? record.index + 40 + record.origin.length : afterText.length)}...</div>,
    },

    {
      title: "",
      dataIndex: "yes",
      render: (_, record) => (
        <div className="d-flex">
          <Button
            type="primary"
            onClick={(e) => {
              setAfterText(afterText.substring(0, record.index) + record.suggestion + afterText.substring(record.index + record.origin.length, afterText.length))
              delElement(record.id, 'id', record.suggestion.length - record.origin.length);
              if (!record.db && record.suggestion !== "Your suggestion" && type == 3) {
                const REQ_URL = 'http://localhost:5000/api/acronym';
                // console.log(record.origin, record.suggestion);
                axios.post(`${REQ_URL}`, {
                  acronym: record.origin,
                  spellout: record.suggestion
                }, {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc`,
                  }
                }
                ).then(
                  (e) => console.log(e)
                )
              }
              if (!record.db && record.suggestion !== "Your suggestion" && type == 4) {
                const REQ_URL = 'http://localhost:5000/api/substitution';
                // console.log(beforeText)
                axios.post(`${REQ_URL}`, {
                  substitution: record.origin,
                  suggestion: record.suggestion
                }, {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc`,
                  }
                }
                ).then(
                  (e) => console.log(e)
                )
              }
            }}
          >
            Yes
          </Button>
        </div>
      ),
    },

    {
      title: "",
      dataIndex: "no",
      render: (_, record) => (
        <div className="d-flex">
          <Button onClick={(e) => {
            delElement(record.id2, 'id2')
          }}>
            No
          </Button>
        </div>
      ),
    },

  ];

  const delElement = (index, el, diff = 0) => {

    let tmpList = [];
    let fg = false;
    for (let idx in list) {
      let flag = (el == 'id') ? (list[idx].id == index) : (list[idx].id2 == index);
      let tmp = JSON.parse(JSON.stringify(list[idx]));
      if (fg) tmp.index += diff;
      if (!flag) tmpList.push(tmp)
      else fg = true;
    }

    setList(tmpList);

  }
  const copyClipBoard = () => {
    navigator.clipboard.writeText(afterText);
  }

  const syllables = x => {
    const subSyl = [/cial/, /tia/, /cius/, /cious/, /giu/, // belgium!
      /ion/, /iou/, /sia$/, /.ely$/, // absolutely! (but not ely!)
      /sed$/];

    const addSyl = [/ia/, /riet/, /dien/, /iu/, /io/, /ii/, /[aeiouym]bl$/, // -Vble, plus -mble
      /[aeiou]{3}/, // agreeable
      /^mc/, /ism$/, // -isms
      /([^aeiouy])\1l$/, // middle twiddle battle bottle, etc.
      /[^l]lien/, // // alien, salient [1]
      /^coa[dglx]./, // [2]
      /[^gq]ua[^auieo]/, // i think this fixes more than it breaks
      /dnt$/];

    // (comments refer to titan's /usr/dict/words)
    // [1] alien, salient, but not lien or ebbullient...
    // (those are the only 2 exceptions i found, there may be others)
    // [2] exception for 7 words:
    // coadjutor coagulable coagulate coalesce coalescent coalition coaxial

    let xx = x.toLowerCase().replace(/'/g, '').replace(/e\b/g, '');
    let scrugg = xx.split(/[^aeiouy]+/).filter(Boolean); // '-' should be perhaps added?

    return undefined === x || null === x || '' === x ? 0 : 1 === xx.length ? 1 : subSyl.map(function (r) {
      return (xx.match(r) || []).length;
    }).reduce(function (a, b) {
      return a - b;
    }) + addSyl.map(function (r) {
      return (xx.match(r) || []).length;
    }).reduce(function (a, b) {
      return a + b;
    }) + scrugg.length - (scrugg.length > 0 && '' === scrugg[0] ? 1 : 0) +
      // got no vowels? ("the", "crwth")
      xx.split(/\b/).map(function (x) {
        return x.trim();
      }).filter(Boolean).filter(function (x) {
        return !x.match(/[.,'!?]/g);
      }).map(function (x) {
        return x.match(/[aeiouy]/) ? 0 : 1;
      }).reduce(function (a, b) {
        return a + b;
      });
  };

  const words = x => {
    return (x.split(/\s+/) || ['']).length;
  };
  const sentences = x => {
    return (x.split('. ') || ['']).length;
  };
  const syllablesPerWord = x => {
    return syllables(x) / words(x);
  };
  const wordsPerSentence = x => {
    return words(x) / sentences(x);
  };

  const rate = x => {
    return 206.835 - 1.015 * wordsPerSentence(x) - 84.6 * syllablesPerWord(x);
  };
  const grade = x => {
    return 0.39 * wordsPerSentence(x) + 11.8 * syllablesPerWord(x) - 15.59;
  };

  const update = () => {
    if (beforeText === '' || beforeText.split(' ').join('').split("'").join('') === '') {
      setWordCount(0);
      setBeforeScore(0);
      setCondition(true);
    } else {
      setWordCount(words(beforeText));
      setBeforeScore(grade(beforeText));
      setCondition(words(beforeText) < 100);
      if (words(beforeText) >= 100) {
        // const UNI_URL = 'http://localhost:5000/api/acronym';
        // axios.get(`${UNI_URL}`, {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc`,
        //   },
        // }).then(e => setList(e.data));
      }
    }
    if (afterText === '' || afterText.split(' ').join('').split("'").join('') === '') setAfterScore(0);
    else setAfterScore(grade(afterText));
    setScore(beforeScore - afterScore);
  }

  useEffect(() => {
    // console.log(list)
    update();
  }, [afterText, beforeText]);

  const onChangeText = e => {
    setBeforeText(e.target.value);
  };

  const duplicate = () => {
    setBeforeText(beforeText + ' ' + beforeText);
  }

  const start = () => {
    setTable(true);
    setAfterText(beforeText);
    request();
  }

  const request = () => {
    if (type == 1 || type == 4) {
      const REQ_URL = 'http://localhost:5000/api/grammar';
      // console.log(beforeText)
      axios.post(`${REQ_URL}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc`,
        },
        data: type == 1 ? beforeText : afterText
      }).then(e => {
        // console.log(e.data)
        setList(e.data)
      });
    }

    if (type == 2) {
      console.log('dfdf');
      const REQ_URL = 'http://localhost:5000/api/process';
      // console.log(beforeText)
      axios.post(`${REQ_URL}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc`,
        },
        data: afterText
      }).then(e => {
        // console.log(e.data)
        setList(e.data)
      });
    }

    if (type == 3) {
      const REQ_URL = 'http://localhost:5000/api/project';
      // console.log(beforeText)
      axios.post(`${REQ_URL}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc`,
        },
        data: afterText
      }).then(e => {
        // console.log(e.data)
        setList(e.data)
      });
    }

    setType(type + 1);

  }
  const restart = () => {
    setBeforeText('');
    setAfterText('Sample text here!');
    setBeforeScore(0);
    setAfterScore(0);
    setScore(0);
    setWordCount(0);
    setCondition(true);
    setTable(false);
    setList([]);
    setType(1);
  }

  return (
    <>
      <Row gutter={16}>
        <Col span={9} style={{ margin: "2em", width: "100%" }}>
          <TextArea readOnly={table} style={table ? { color: "black" } : {}} allowClear placeholder="put the sentences to check" value={beforeText} onChange={e => onChangeText(e)} autoSize />
          <Row gutter={16} style={{ margin: "2em", width: "100%" }}>
            <Col span={16}>
              <Statistic title="Words Count" value={wordCount} />
              {condition ? <Flex style={{ marginTop: 16 }}>
                <div style={{ color: "red", padding: 10 }}>Must put more than 100 words!</div>
                <Button onClick={() => duplicate()} type="ghost">Duplicate the text</Button>
              </Flex> : ""}
            </Col>
            <Col span={6}>
              <Statistic style={{ float: "right" }} title="Flesch-Kincaid score" precision={2} value={beforeScore} />
            </Col>
          </Row>
        </Col>
        <Col span={9} style={{ margin: "2em", width: "100%" }}>
          <TextArea readOnly placeholder="fixed sentences" value={afterText} autoSize />
          <Statistic style={{ margin: "2em", textAlign: "right" }} title="Flesch-Kincaid score" precision={2} value={afterScore} />
        </Col>
        <Col span={3} style={{ margin: "2em", width: "100%" }}>
          <Button
            type="primary"
            onClick={() => copyClipBoard()}
          >
            <CopyOutlined />
          </Button>
          <Statistic style={{ marginTop: "2em" }} title="Total score" precision={2} value={Score} />
        </Col>
      </Row >
      <Row gutter={16}>
        <Col lg={24} >
          {type > 1 && type < 5 && list == 0 ? <Button type="primary" style={{ marginLeft: "2em" }} onClick={() => request()}>Next Step</Button> : <Button type="primary" style={{ marginLeft: "2em" }} onClick={() => restart()}>Restart</Button>}
          {condition ? "" : table ? <Table style={{ marginLeft: '2em' }} columns={tableColumns} dataSource={list} rowKey="id2" />
            : <Button type="primary" style={{ marginLeft: "2em" }} onClick={() => start()}>Stop Typing</Button>}
        </Col>
      </Row>
    </>
  );
};

export default UserList;
