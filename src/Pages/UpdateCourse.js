import React, { useState, useEffect } from "react";
import NavBar from "../component/NavBar";
import "../Css/addCourse.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css"; 


function UpdateCourse() {
  const [courses, setCourses] = useState([])
  const [courseTitle, setCourseTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [displayInfo, setDisplayInfo] = useState([]);
  const [CourseId, setcourseId] = useState('');
  const [VideoId, setvideoId] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState('');
  const [priceAfterDiscount, setPriceAfterDiscount] = useState('');
 
  const [description, setDescription] = useState('');
  const [departmentData, setDepartmentData] = useState([])
  const [teacherData, setTeacherData] = useState([])
  const location = useLocation();
  const navigate = useNavigate();
  const [department_id, setDepartment_id] = useState(null)
  const [teacher_id, setTeacher_id] = useState(null)
  const [videoFiles, setVideoFiles] = useState([]);
  const [videoLinks, setVideoLinks] = useState([]);
  const [defaultVideoFile, setDefaultVideoFile] = useState(null);
  const [currentContext, setCurrentContext] = useState(null); // or 'link'

  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState([]);





  useEffect(() => {
    console.log("Location state:", location.state);
    if (location.state && location.state.id) {
      setcourseId(location.state.id);
    } else {
      console.warn('No ID found in location.state');
    }
  }, [location.state]);
  





const handleteacher = (e) => {
  const selectedteacherId = e.target.value;
  setTeacher_id(selectedteacherId);
};

const handleDepartment = (e) => {
  const selectedDepartmentId = e.target.value;
  setDepartment_id(selectedDepartmentId);
};

console.log("courseId: " + CourseId);

useEffect(() => {
  const fetchDepartments = async () => {
    try {
      const response = await axios.get("https://ba9ma.kasselsoft.online/department");
      setDepartmentData(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  fetchDepartments();
}, []);

useEffect(() => {
  const fetchTeachers = async () => {
    try {
      const response = await axios.get("https://ba9ma.kasselsoft.online/teacher/");
      setTeacherData(response.data);
    } catch (error) {
      console.error("Error fetching Teachers:", error);
    }
  };

  fetchTeachers();
}, []);




  
useEffect(() => {
  const fetchLinks = async () => {
    console.log("Fetching links for CourseId:", CourseId);
    try {
      const response = await axios.get(`https://ba9ma.kasselsoft.online/courses/links/${CourseId}`);

      const linksDataArray = response.data;
      
      if (Array.isArray(linksDataArray) && linksDataArray.length > 0) {
        console.log("Fetched Links:", linksDataArray);
        setVideoLinks(linksDataArray); // Set the entire array as the video links state
      } else {
        console.warn("No course data found for the given CourseId");
      }
    } catch (error) {
      console.error(`Error fetching links: ${error}`);
    }
  };

  if (CourseId) {
    fetchLinks();
  } else {
    console.warn("No CourseId provided, skipping fetch.");
  }
}, [CourseId]);



useEffect(() => {
  // Fetch existing video files when component mounts
  const fetchVideoFiles = async () => {
    console.log("Fetching video files for CourseId:", CourseId);
    try {
      const response = await axios.get(`https://ba9ma.kasselsoft.online/courses/videos/${CourseId}`);
      const fileDataArray = response.data;
      console.log("Fetched file:55555555555555555", response.data);
      setvideoId(response.data.id)
      console.log("Fetching video files for videoId:888888888888888888888", VideoId);
      if (Array.isArray(fileDataArray) && fileDataArray.length > 0) {
        console.log("Fetched file:", fileDataArray);
        setVideoFiles(fileDataArray); // Update state with video files
        // If videoLinks is also needed, update it as needed
        // setVideoLinks(fileDataArray);
      } else {
        console.warn("No course data found for the given CourseId");
      }
    } catch (error) {
      console.error(`Error fetching file: ${error}`);
    }
  };

  if (CourseId) {
    fetchVideoFiles();
  } else {
    console.warn("No CourseId provided, skipping fetch.");
  }
}, [CourseId]);



useEffect(() => {
  console.log("Video Links State:", videoLinks); // Add this to verify state
}, [videoLinks]);

 // Fetch course details when courseId is available
useEffect(() => {
  if (CourseId) {
    const fetchCourseDetails = async () => {
      console.log("CourseId:", CourseId);
      try {
        const response = await axios.get(`https://ba9ma.kasselsoft.online/courses/${CourseId}`);
        const courseDataArray = response.data;

        // Ensure courseDataArray is not empty
        if (courseDataArray.length > 0) {
          const courseData = courseDataArray[0]; // Access the first element

          // Logging the response to check the keys
          console.log("Full course data response:", courseData);

          // Populate state with the fetched course data
          setCourseTitle(courseData.subject_name || '');
          setTeacherName(courseData.teacher_name || '');
          setDepartmentName(courseData.department_name || '');
          setPriceBeforeDiscount(courseData.before_offer || '');
          setPriceAfterDiscount(courseData.after_offer || '');
       
          setDescription(courseData.descr || '');
        } else {
          console.warn("No course data found for the given CourseId");
        }

      } catch (error) {
        // Handle errors here
        console.error("Error fetching course details:", error);
      }
    };
    fetchCourseDetails();
  }
}, [CourseId]);


  
const addVideoField = () => {
  setVideoFiles([...videoFiles, { title: '', url: null }]);
};

// Add a new link field
const addLinkField = () => {
  setVideoLinks([...videoLinks, { title: '', link: '' }]);
};



  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

// Function to handle default video file change
const handleDefaultVideoFileChange = (e) => {
  setDefaultVideoFile(e.target.files[0]);
};


 
// const handleVideoTitleChange = (index, event) => {
//   const newVideoFiles = [...videoFiles];
//   newVideoFiles[index].title = event.target.value;
//   setVideoFiles(newVideoFiles);
// };




  const handleVideoFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedVideos = [...videoFiles];
      updatedVideos[index] = { ...updatedVideos[index], url: file };
      setVideoFiles(updatedVideos);
    }
  };



  const handleVideoTitleChange = (index, event) => {
    const updatedVideos = [...videoFiles];
    updatedVideos[index] = { ...updatedVideos[index], title: event.target.value };
    setVideoFiles(updatedVideos);
  };

  const handleLinkTitleChange = (index, event) => {
    const updatedLinks = [...videoLinks];
    updatedLinks[index] = { ...updatedLinks[index], title: event.target.value };
    setVideoLinks(updatedLinks);
  };

  const handleLinkChange = (index, event) => {
    const updatedLinks = [...videoLinks];
    updatedLinks[index] = { ...updatedLinks[index], link: event.target.value };
    setVideoLinks(updatedLinks);
  };


 

  const handleUpdate = async () => {
    
    if (!courseTitle || !teacher_id || !department_id  || !priceBeforeDiscount || !priceAfterDiscount || !description) {
        Toastify({
            text: "Please Fill All Field",
            duration: 3000, // Duration in milliseconds
            gravity: "top", // 'top' or 'bottom'
            position: 'right', // 'left', 'center', 'right'
            backgroundColor: "#CA1616",
        }).showToast();
        return;
    }

    try {
        const formData = new FormData();
        formData.append('subject_name', courseTitle);
        formData.append('teacher_id', teacher_id);
        formData.append('before_offer', priceBeforeDiscount);
        formData.append('after_offer', priceAfterDiscount);
       
        formData.append('descr', description);
        formData.append('department_id', department_id);
        
        console.log("link", videoLinks);
        // Append files with proper names expected by the server
        if (selectedFile) {
            formData.append('img', selectedFile); // Ensure 'img' matches with the server-side field
        }
       
         // Append default video file
         if (defaultVideoFile) {
          formData.append('defaultvideo', defaultVideoFile);
      }


     
videoFiles.forEach((video, index) => {
  formData.append(`id`, video.id);  // Append the video ID
  formData.append(`title`, video.title); // Append the title
  formData.append(`videoFiles`, video.url); // Append the video file (url here represents the file object)
});
    
      console.log("first video", videoFiles.title)
     
      
    
// Modify the FormData appending process to include unique IDs for each link
videoLinks.forEach((link, index) => {
  formData.append(`videoLinks[${index}].id`, link.id); // Add unique ID
  formData.append(`videoLinks[${index}].title`, link.title);
  formData.append(`videoLinks[${index}].link`, link.link);
});



        const response = await axios.put(
            `https://ba9ma.kasselsoft.online/courses/${CourseId}`,
            formData, // Send the FormData object
            {
                headers: {
                    "Content-Type": "multipart/form-data", 
                },
            }
        );
        setCourses((prevAdd) =>
            prevAdd.map((data) =>
                data.id === CourseId ? response.data : data
            )
        );
        Toastify({
            text: "Updated completely",
            duration: 3000, // Duration in milliseconds
            gravity: "top", // 'top' or 'bottom'
            position: 'right', // 'left', 'center', 'right'
            backgroundColor: "#833988",
        }).showToast();
        navigate('/courses');
        console.log("courseTitle",courseTitle)
        console.log("department_id",department_id)
        console.log("description",description)
        
        console.log("priceAfterDiscount",priceAfterDiscount)
        console.log("priceBeforeDiscount",priceBeforeDiscount)
        console.log("teacher_id",teacher_id)
        console.log("defaultVideoFile",defaultVideoFile)
        console.log("selectedFile",selectedFile)
        console.log("link", videoLinks);
        console.log("videoFiles", videoFiles);

    } catch (error) {
        console.log(`Error in fetch edit data: ${error}`);
    }
};

  


const deleteVideo = async (id) => {
  try {
    await axios.delete(`https://ba9ma.kasselsoft.online/courses/videos/${id}`);
    console.log('Video deleted successfully');
    setVideoFiles(videoFiles.filter(video => video.id !== id));
  } catch (error) {
    console.error('Error deleting video:', error);
  }
};

const deleteLink = async (id) => {
  try {
    await axios.delete(`https://ba9ma.kasselsoft.online/courses/videos/${id}`);
    console.log('Link deleted successfully');
    setVideoLinks(videoLinks.filter(link => link.id !== id));
  } catch (error) {
    console.error('Error deleting link:', error);
  }
};

  
return (
  <>
    <NavBar title={"المواد"} />
    <div className="container">
      <div className="row">
        <div className="col-lg-2 col-md-6 col-sm-12">
          <div className="title_add_course">تعديل مادة</div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <p className="input_title_addcourse">اسم المادة</p>
          <input
            type="text"
            className="input_addcourse"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <p className="input_title_addcourse">اسم الاستاذ</p>
          <select
            name="Teacher_id"
            value={teacher_id}
            onChange={handleteacher}
            id="lang"
            className="select_dep"
          >
            <option value="">اختر اسم الاستاذ</option>
            {teacherData.map((techer) => (
              <option key={techer.id} value={techer.id}>
                {techer.teacher_name}
              </option>
            ))}
          </select>


        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <p className="input_title_addcourse">القسم</p>
          <select
            name="department"
            value={department_id}
            onChange={handleDepartment}
            id="lang"
            className="select_dep"
          >
            <option value="">اختر قسم</option>
            {departmentData.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.title}
              </option>
            ))}
          </select>

        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <p className="input_title_addcourse">السعر بعد الخصم</p>
          <input
            type="text"
            className="input_addcourse"
            value={priceBeforeDiscount}
            onChange={(e) => setPriceBeforeDiscount(e.target.value)}
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <p className="input_title_addcourse">السعر قبل الخصم</p>
         <input
            type="text"
            className="input_addcourse"
            value={priceAfterDiscount}
            onChange={(e) => setPriceAfterDiscount(e.target.value)}
          />
        </div>
      
      </div>
      <div className="row mt-4">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <p className="input_title_addcourse">الوصف</p>
          <textarea
            className="input_textarea_addcourse"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>


        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <p className="input_title_addcourse">صورة المادة</p>
          <div className="file-input-container">
             <input
              type="file"
              className="choose_file_addcourse"
              onChange={handleFileChange}
            />
            <span className="ps-5">اختر صورة</span>
            {selectedFile && <span>{selectedFile.name}</span>}
            {!selectedFile && (
              <span className="selected_file_addcourse">
                No file selected
              </span>
            )}
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
        <p className="input_title_addcourse">فيديو المقدمة</p>
        <div className="file-input-container">
            <input
              type="file"
              multiple
              className="choose_file_addcourse"
              onChange={handleDefaultVideoFileChange}
            />
            
            <span className="ps-5 selected_file_addcourse">عدل فيديو المقدمة</span>
            {defaultVideoFile && <span>{defaultVideoFile.name}</span>}
            {!defaultVideoFile && (
              <span className="selected_file_addcourse">
                No file selected
              </span>
            )}
          </div>
        </div>
      </div>




    










    <hr />
        <div className="col-lg-12">
        <div className="row mt-4">
        
       

        <p className="input_title_addcourse">اضافة جديده</p>
        <div>
   
    
  </div>
    <div>
      <button className="btn btn_add_video ms-5" onClick={() => setCurrentContext('video')}>Video</button>
      <button className="btn btn_add_video" onClick={() => setCurrentContext('link')}>Link</button>
    </div>

  
      
{currentContext === 'video' && (
  videoFiles.length > 0 ? (
    videoFiles.map((video, index) => (
      <div key={index}>
        <p className="input_title_addcourse">{video.title}</p>
        <div className="file_input_addvideo">
          <button className="btn_choose_video">اختيار ملف</button>
          <input
            type="file"
           
            className="choose_file_addcourse"
            onChange={(e) => handleVideoFileChange(index, e)}
            required
          />
          <span className="ps-5 selected_file_addvideo">قم بتحميل الملفات من هنا</span>
          {!video.url && <span className="selected_file_addcourse">No file selected</span>}
        </div>
        {video.url && (
          <div className="d-flex justify-content-around">
            <p className="selected_file_addcourse">{video.url.name}</p>
            <i
              className="fa-solid fa-square-xmark fa-lg mt-2"
              onClick={() => deleteVideo(video.id)}
              style={{ color: '#944b43' }}
            ></i>
          </div>
        )}
      </div>
    ))
  ) : (
    <p className="input_title_addcourse mt-3">لم يتم تحميل أي مقاطع فيديو بعد.</p>
  )
)}



{currentContext === 'link' && (
      videoLinks.length > 0 ? (
        videoLinks.map((link, index) => (
          <div key={index}>
            <p className="input_title_addcourse">عنوان الموضوع</p>
            <input
              type="text"
              name="title"
              className="input_addcourse"
              value={link.title}
              onChange={(e) => handleLinkTitleChange(index, e)}
              placeholder="ادخل اسم الفيديو"
              required
            />
            <input
              type="text"
              name="link"
              className="input_addcourse"
              value={link.link}
              onChange={(e) => handleLinkChange(index, e)}
              placeholder="ادخل رابط الفيديو "
              required
            />
            <i
              className="fa-solid fa-square-xmark fa-lg mt-2"
              onClick={() => deleteLink(link.id)}
              style={{ color: '#944b43' }}
            ></i>
          </div>
        ))
      ) : (
        <p className="input_title_addcourse mt-3">لم يتم تحميل أي  روابط بعد.</p> // Fallback message
      )
    )}

    <button
      type="button"
      className="btn btn_add_video float-start"
      onClick={currentContext === 'video' ? addVideoField : addLinkField}
    >
      {currentContext === 'video' ? 'Add Video' : 'Add Link'}
    </button>

        </div>
      </div>
   



      <div className="row mt-4">
        <div className="col-lg-12">
        <button className="btn_addCourse px-5 py-2  mt-5" onClick={handleUpdate}>تحديث</button>
        </div>
      </div>
    </div>
  </>
);
}

export default UpdateCourse;
