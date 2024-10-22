"use client"
import { useEffect, useState, useCallback } from 'react';
import { getAllCareer, getOneCareerById } from '../../apis/career';
import CareerCards from './components/careerCard';

const CareerPage = () => {
  const [careers, setCareers] = useState([]);
  const [careerDetails, setCareerDetails] = useState(null);
  const [selectedCareerId, setSelectedCareerId] = useState(null);  // เก็บ id ของ career ที่ถูกเลือก

  const fetchCareerList = useCallback(async () => {
    try {
      const careerData = await getAllCareer();
      setCareers(careerData);
      console.log("PAGE DATA", careerData);
    } catch (error) {
      console.error('Error fetching careers:', error);
    }
  }, []);

  const fetchCareerDetails = useCallback(async (id) => {
    try {
      const careerData = await getOneCareerById(id);
      setCareerDetails(careerData);
      console.log("CAREER DETAILS", careerData);
    } catch (error) {
      console.error('Error fetching career details:', error);
    }
  }, []);

  const handleClick = async (id) => {
    setSelectedCareerId(id);  // อัปเดต id ของ career ที่ถูกเลือก
    await fetchCareerDetails(id);  // ดึงรายละเอียดของ career
    console.log("Clicked Career ID", id);  // แสดง id ที่ถูกคลิก
  };

  useEffect(() => {
    fetchCareerList();
  }, [fetchCareerList]);  // เรียกใช้ฟังก์ชันนี้ใน useEffect

  return (
    <div className='m-6 flex flex-row justify-center'>
      <div className='w-1/5 mr-4'>
        {careers.map((career) => (
          <CareerCards
            key={career.id}
            career={career}
            onClick={() => handleClick(career.id)}
            isSelected={career.id === selectedCareerId}  // ตรวจสอบว่าเป็น career ที่ถูกเลือกหรือไม่
          />
        ))}
      </div>
      <div className='w-3/5 bg-white border rounded-lg p-4 shadow-lg'>
        <div>
          {careerDetails ? (
            <div className='p-5'>
              <div className='text-2xl py-3'>{careerDetails.title}</div>
              <div>Site: {careerDetails.site}</div>
              <div>Location: {careerDetails.location}</div>
              <div>Salary: {careerDetails.salary}</div>
              <div className='py-3'>
                <div className='p-1 text-xl'>Description</div>
                <div> {careerDetails.description}</div>
              </div>
              <div>
                <div className='bg-[#3C3D37] w-32 flex justify-center p-2 rounded-md shadow-md cursor-pointer hover:bg-[#181C14] m-2 text-white'>APPLY NOW</div>
                <div className='text-xs'>
                  When you click on the APPLY NOW button, your default email client will pop up.
                  ※If your email app does not activate, please send an email to career@kojimaproductions.jp with your desired position in the subject line and submit any required documents.
                </div>
                <div>
                  <div className='pt-7 pb-2 text-xl'>
                    Documents to be submitted
                  </div>
                  <div>
                    <ul className="list-disc pl-5">
                      <div className=''>Resume (with photo)</div>
                      <li>Work history
                        <ul className="list-disc pl-5">
                          <li>Please specify all game titles you have been involved with in the past.</li>
                          <li>Please specify any program languages that you can use.</li>
                          <li>Please specify software that you can use (Photoshop, Maya, etc.).</li>
                          <li>Please list two recent technical presentations.</li>
                          <li>Please name one game you recently played.</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className='text-xl pt-4 pb-1'>Benefits</div>
                    <div>
                    Various insurance, transportation expenses, salary revision (once a year), medical checkups, 
                    telework available, congratulatory and condolence allowances, corporate defined contribution 
                    pension plan (for full-time employees only), incentives (for full-time employees only)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>SELECT CAREER</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CareerPage;
