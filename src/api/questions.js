export const QUESTIONS = [
    {
      "title": "Question 1?",
      "key": 1,
      "answers": [
        {
          "title": "Answer 11",
          "value": 11,
          "sub": {
            "title": "Question 111?",
            "key": 111,
            "answers": [
              {
                "title": "Answer 111",
                "value": 111
              },
              {
                "title": "Answer 112",
                "value": 112
              },
              {
                "title": "Answer 113",
                "value": 113
              }
            ]
          }
        },
        {
          "title": "Answer 12",
          "value": 12,
          "sub": {
            "title": "Question 121?",
            "key": 121,
            "answers": [
              {
                "title": "Answer 121",
                "value": 121
              },
              {
                "title": "Answer 122",
                "value": 122
              },
              {
                "title": "Answer 113",
                "value": 113
              }
            ]
          }
        }
      ]
    },
    {
      "title": "Question 2?",
      "key": 2,
      "show_if": [11, 113],
      "answers": [
        {
          "title": "Answer 21",
          "value": 21
        },
        {
          "title": "Answer 22",
          "value": 22
        }
      ]
    },
    {
      "title": "Question 3",
      "key": 3,
      "answers": [
        {
          "title": "Answer 31",
          "value": 31
        },
        {
          "title": "Answer 32",
          "value": 32,
          "sub": {
            "title": "Question 321",
            "key": 321,
            "answers": [
              {
                "title": "Answer 321",
                "value": 321
              },
              {
                "title": "Answer 322",
                "value": 322
              }
            ]
          }
        }
      ]
    },
    {
      "title": "Question 4",
      "show_if": [12, 113, 22],
      "key": 4,
      "answers": [
        {
          "title": "Answer 41",
          "value": 41
        },
        {
          "title": "Answer 42",
          "value": 42
        },
        {
          "title": "Answer 43",
          "value": 43
        }
      ]
    },
    {
      "title": "Question 5",
      "key": 5,
      "answers": [
        {
          "title": "Answer 51",
          "value": 51
        },
        {
          "title": "Answer 52",
          "value": 52
        },
        {
          "title": "Answer 53",
          "value": 53
        }
      ]
    },
    {
      "title": "Question 6",
      "key": 6,
      "answers": [
        {
          "title": "Answer 61",
          "value": 61
        },
        {
          "title": "Answer 62",
          "value": 62
        },
        {
          "title": "Answer 63",
          "value": 63
        }
      ]
    },
    {
      "title": "Question 7",
      "key": 7,
      "answers": [
        {
          "title": "Answer 71",
          "value": 71
        },
        {
          "title": "Answer 72",
          "value": 72
        }
      ]
    },
    {
      "title": "Question 8",
      "show_if": [21],
      "key": 8,
      "answers": [
        {
          "title": "Answer 81",
          "value": 81
        },
        {
          "title": "Answer 82",
          "value": 82
        }
      ]
    },
    {
      "title": "Question 9",
      "key": 9,
      "answers": [
        {
          "title": "Answer 91",
          "value": 91
        },
        {
          "title": "Answer 92",
          "value": 92
        }
      ]
    }
  ]