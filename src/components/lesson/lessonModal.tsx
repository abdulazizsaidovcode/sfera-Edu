import React, { useEffect, useState } from 'react';
import Modal from '@/components/moduleSaidbar/modulTeacher';
import { InputDemo } from '../Inputs/InputDemo';
import ShinyButton from '../magicui/shiny-button';
import { LessonAdd } from '@/context/api/url';
import { config } from '@/context/api/token';
import { usePost } from '@/context/logic/global_functions/usePostOption';
import { getCategoryTeachers, getModules } from '@/context/logic/course';
import { useTeacherCategory } from '@/context/logic/state-managment/teacher/teacher';
import SelectTeacher from '@/components/select/selectTeacher';
import { useModule } from '@/context/logic/state-managment/module';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; 
import { BiSolidImageAdd } from 'react-icons/bi';
import { checkImgUpload } from '@/context/logic/global_functions/fileUpolatOptions';

const LessonModal = ({ lessonAdd, closeModal }) => {
    const [lessonName, setLessonName] = useState('');
    const [description, setDescription] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [duration, setDuration] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setModuleData } = useModule();
    const [errors, setErrors] = useState({});
    const { setTeacherCategory, teacherCategory } = useTeacherCategory();
    const [selectedTeacherId, setSelectedTeacherId] = useState(null);
    const [selectedModuleId, setSelectedModuleId] = useState(null); 
    const [modules, setModules] = useState([]);
    const [imageId, setImageId] = useState(null);

    const { postData, response } = usePost(LessonAdd, {
        name: lessonName,
        description,
        videoLink,
        videoTime: duration,
        moduleId: selectedModuleId,
        fileId: 0,
    }, config);

    const validateFields = () => {
        const newErrors = {};
        if (!lessonName) newErrors.lessonName = 'Dars mavzusi bo\'sh bo\'lmasligi kerak.';
        if (!description) newErrors.description = 'Izoh bo\'sh bo\'lmasligi kerak.';
        if (!videoLink) newErrors.videoLink = 'Video linki bo\'sh bo\'lmasligi kerak.';
        if (!duration) newErrors.duration = 'Davomiylik vaqtini kiriting.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const uploadedImageId = await checkImgUpload(file, setImage);
                setImageId(uploadedImageId);
                const imageUrl = URL.createObjectURL(file);
                setImage(imageUrl); 
                console.log("Uploaded Image ID:", uploadedImageId);
            } catch (error) {
                console.error("Image upload failed:", error);
            }
        }
    };

    const handleImageClick = () => {
        document.getElementById("image-upload").click();
    };


    useEffect(() => {
        getCategoryTeachers(setTeacherCategory).then(() => {
            console.log('Teacher Category:', teacherCategory);
        });
    }, []);

    useEffect(() => {
        if (selectedTeacherId) {
            getModules(selectedTeacherId, (fetchedModules) => {
                setModules(fetchedModules);
                setModuleData(fetchedModules); 
            });
        } else {
            setModules([]); 
        }
    }, [selectedTeacherId]);

    const handleSave = async () => {
        if (!validateFields()) return;
        setLoading(true);
        handleCloseModal(); 
        const dataToSend = {
            name: lessonName,
            description,
            videoLink,
            videoTime: duration,
            moduleId: selectedModuleId,
            fileId: 0,
        };

        try {
            const response = await postData();
            console.log("Backenddan qaytgan ma'lumot:", response);
            if (response && response.status === 'Success') {
                toast.success('Ma\'lumot qo\'shildi!'); 
                handleCloseModal(); 
            }
        } catch (error) {
            console.error("Xato yuz berdi:", error);
            toast.error('Ma\'lumot qo\'shildi!'); 
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setLessonName('');
        setDescription('');
        setVideoLink('');
        setDuration('');
        setImage(null);
        setErrors({});
        setSelectedTeacherId(null);
        setSelectedModuleId(null); 
        closeModal();
    };

    return (
        <div>
            <Modal isOpen={lessonAdd} onClose={handleCloseModal}>
                <h2 className="text-xl font-bold mb-4">Darsni tahrirlash</h2>
                <div className={`min-w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
                    <div className='mb-15'>
                        <div className='mb-5'>
                            <label className="mb-2 text-gray-700">Yo'nalishni tanlang</label>
                            <SelectTeacher
                                style={{
                                    width: '640px',
                                    height: '44px',
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: '6px'
                                }}
                                defaultValue="Yo'nalishni tanlang"
                                dropdownStyle={{ zIndex: 9999 }}
                                options={teacherCategory?.map((group) => ({
                                    value: group.id,
                                    label: group.name,
                                })) || []}
                                onChange={(value) => {
                                    setSelectedTeacherId(value);
                                }}
                            />
                        </div>

                        {selectedTeacherId && (
                            <div className='mb-5'>
                                <label className="mb-2 text-gray-700">Modulni tanlang</label>
                                <SelectTeacher
                                    style={{
                                        width: '640px',
                                        height: '44px',
                                        backgroundColor: "#f0f0f0",
                                        borderRadius: '6px'
                                    }}
                                    defaultValue='Modulni tanlang'
                                    dropdownStyle={{ zIndex: 9999 }}
                                    options={modules.map((module) => ({
                                        value: module.moduleId,
                                        label: module.name,
                                    })) || []}
                                    onChange={(value) => {
                                        setSelectedModuleId(value);  
                                        console.log('Selected Module ID:', value); 
                                    }}
                                />
                            </div>
                        )}

                        <div className='mb-3'>
                            <InputDemo
                                label='Dars mavzusini kiriting: '
                                type="text"
                                placeholder="Dars mavzusini kiriting"
                                value={lessonName}
                                onChange={(e) => setLessonName(e.target.value)}
                            />
                            {errors.lessonName && <p className="text-red-600">{errors.lessonName}</p>}
                        </div>
                        <div className='mb-3'>
                            <InputDemo
                                label='Dars yuzasidan izoh yozing: '
                                type="text"
                                placeholder="Dars yuzasidan izoh yozing"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            {errors.description && <p className="text-red-600">{errors.description}</p>}
                        </div>
                        <div className='mb-3'>
                            <InputDemo
                                label='Darsni videosini urlni joylang: '
                                type="text"
                                placeholder="Darsni videosini urlni joylang"
                                value={videoLink}
                                onChange={(e) => setVideoLink(e.target.value)}
                            />
                            {errors.videoLink && <p className="text-red-600">{errors.videoLink}</p>}
                        </div>
                        <div className='mb-3'>
                            <InputDemo
                                label='Videoni davomiylik vaqtini kiriting: '
                                type="number"
                                placeholder="Videoni davomiylik vaqtini kiriting"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                            {errors.duration && <p className="text-red-600">{errors.duration}</p>}
                        </div>
                        <label htmlFor="">File yuklang :</label>
                        <div className="flex flex-col items-center mb-3">
                            
                            {image ?
                                (
                                    <img
                                        src={image}
                                        alt="Uploaded preview"
                                        className="mt-3 w-50 h-40 border object-cover rounded"
                                    />
                                )
                                :
                                (
                                    <>
                                        <BiSolidImageAdd className="text-7xl cursor-pointer" onClick={handleImageClick} />
                                        <input
                                            id="image-upload"
                                            type="file"
                                            accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.pptx,.zip"
                                            onChange={handleImageChange}
                                            className="hidden border"
                                        />
                                    </>
                                )}

                        </div>
                    </div>
                </div>

                <div className="flex justify-between">
                <div>
                        <ShinyButton
                            text={loading ? "Loading..." : "Bekor qilish"}
                            className="bg-red-600 shadow-lg py-2 px-6 text-white"
                            onClick={handleCloseModal}
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <ShinyButton
                            text={loading ? "Loading..." : "Saqlash"}
                            className="bg-[#16423C] shadow-lg py-2 px-6 text-white"
                            onClick={handleSave}
                            disabled={loading}
                        />
                    </div>
                </div>
            </Modal>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default LessonModal;
