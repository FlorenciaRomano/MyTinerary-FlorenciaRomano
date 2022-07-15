import axios from 'axios';
import Swal from "sweetalert2";

const commentsActions = {
  addComment: (comments) => {
    const token = localStorage.getItem("token");
    console.log(comments)
    return async (dispatch, getState) => {
      if (comments.comment !== "") {
        const res = await axios.post(
          `http://localhost:4000/api/itinerary/comment`,
          { comments },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

    Swal.fire({
      icon: "success",
      title: res.data.message,
    });
        // dispatch({ 
        //   type: 'MESSAGE',
        //   payload: {
        //     view: true,
        //     message: res.data.message,
        //     success: res.data.success,
        //   },
        // });
        return res;
      } else {
    Swal.fire({
      icon: "warning",
      title: "Add comment",
    });
        // dispatch({
        //   type: 'MESSAGE',
        //   payload: {
        //     view: true,
        //     message: "Add comment",
        //     success: false,
        //   },
        // });
      }
    };
  },

  modifyComment: (id, value) => {
    
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
        console.log(id);
    console.log(value);
      const res = await axios.put(
        `http://localhost:4000/api/itinerary/comment/${id}`,
        {value},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log(res)
    Swal.fire({
      icon: "success",
      title: res.data.message,
    });
      // dispatch({
      //   type: 'MESSAGE',
      //   payload: {
      //     view: true,
      //     message: res.data.message,
      //     success: res.data.success,
      //   },
      // });

      return res;
    };
  },
  deleteComment: (id) => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState) => {
      console.log(id);
      const res = await axios.post(
        `http://localhost:4000/api/itinerary/comment/${id}`,
        {},
        { //voy a prender el horno asi hago una pizziita
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    Swal.fire({
      icon: "success",
      title: res.data.message,
    });
      // dispatch({
      //   type: 'MESSAGE',
      //   payload: {
      //     view: true,
      //     message: res.data.message,
      //     success: res.data.success,
      //   },
      // });
      return res;
    };
  },
};

export default commentsActions;