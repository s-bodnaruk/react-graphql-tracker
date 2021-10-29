import gql from "graphql-tag";

export const TIMERECORD_INFO = gql`
  fragment TIMERECORD_INFO on Timerecord {
    id
    timespent
    startdate
    enddate
    running
    notes
    task {
      id
    }
    contact {
      id
      fullname
    }
  }
`;

export const startTimerMutation = gql`
  ${TIMERECORD_INFO}
  mutation START_TIMERECORD($input: StartTimerecordInput) {
    startTimerecord(input: $input) {
      ...TIMERECORD_INFO
    }
  }
`;

export const stopTimerMutation = gql`
  ${TIMERECORD_INFO}
  mutation STOP_TIMERECORD($input: StartTimerecordInput) {
    stopTimerecord(input: $input) {
      ...TIMERECORD_INFO
    }
  }
`;
