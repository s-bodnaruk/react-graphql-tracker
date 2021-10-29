import gql from "graphql-tag";

export const getTasks = gql`
  query GET_TASKS {
    tasks(
      input: {
        limit: 10
        orderby: { name: asc }
        where: { displaytype: { NEQ: heading }, status: { EQ: active } }
      }
    ) {
      id
      name
      timerecords {
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
      taskTotalTimespent: timespent
    }
  }
`;
