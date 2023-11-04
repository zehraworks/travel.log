export default function Home() {
  return <main >
  <div className="relative bg-world bg-cover w-screen h-screen">
    <div className="absolute font-normal bottom-40 left-20 text-4xl tracking-wider text-white">
      <p className=""><span class="text-white border-b-8 border-yellow-500">Travelog:</span> Because Every <br></br> </p>
       <p className="leading-8 mt-8">Adventure Deserves a Story. </p>
       </div>
  </div>
  <div>
        <div className="font-bold text-3xl tracking-wider text-logo-color pl-20 pt-28 pb-10">Craft Unforgettable Journeys,<br></br>
        One Adventure at a Time.
        </div>
        <div className="bg-pins bg-cover w-screen h-[32rem]"></div>
      </div>
      <div className="font-bold text-3xl tracking-wider text-logo-color pl-20 pt-20">
      From Dreaming to Documenting:  <br></br>
      Your Ultimate Travel Companion.
      </div>
      <div className="flex-row px-20 pt-10">
        <div className="w-80vw flex justify-between gap-x-24">
            <div className="w-1/2 pb-5">
            <p className="text-lg font-semibold pb-5">Photo Journal </p>
            <p className="text-text-color ">Capture and immortalize your travel memories with our Photo Journal feature. Easily upload and organize your travel photos, creating a visual diary of your adventures. </p>
            </div>
            <div className="w-1/2 pb-5 ">
            <p className="text-lg font-semibold pb-5"> Interactive Map </p>
            <p className="text-text-color"> Pin your favorite places, add notes, and create a personalized map showcasing all the destinations you've explored. </p>
            </div>
        </div>
        <div className=" w-80vw flex justify-between  gap-x-24">
            <div className="w-1/2 pb-5">
              <p className="text-lg font-semibold pb-5">Offline Access</p>
              <p className="text-text-color">Enjoy offline access to your saved photos and locations, making it convenient for remote adventures.</p>
            </div>
            <div className="w-1/2 pb-5">
              <p className="text-lg font-semibold pb-5">Privacy Controls</p>
              <p className="text-text-color"> Your privacy matters. Customize your sharing settings and choose who can view your saved locations and photos, offering you complete control over your travel memories.</p>
            </div>
        </div>
      </div>

  <div className="flex w-screen h-screen m-10">
    <div className="bg-passport object-cover bg-no-repeat  w-1/2 h-full">
    </div>
  <div className="w-1/2 pl-10 ">
    <div className="pt-28 pb-10">
      <p className="text-lg font-semibold pb-8">Photo Attachments to Places </p>  
      <p className="w-4/5 tracking-wider font-normal whitespace-normal pb-6">Seamlessly connect your travel photos to specific locations on the map. Attach your photos to places you've been, making it easy to revisit and reminisce about your adventures.</p>
    </div>

    <div class="space-y-10 pl-8">
      <div class="flex items-center">
        <div class="w-8 h-8 rounded-full bg-orange-500 mr-2"></div>
        <p className="pl-4">Add your own notes and descriptions to each saved location.</p>
      </div>

      <div class="flex items-center">
        <div class="w-8 h-8  rounded-full bg-orange-500 mr-2"></div>
        <p className="pl-4">Document your experiences, write down recommendations.</p>
      </div>

      <div class="flex items-center">
        <div class="w-8 h-8  rounded-full bg-orange-500 mr-2"></div>
        <p className="pl-4">Include personal anecdotes to make your travel memories richer.</p>
      </div>
    </div>
  </div>
    <div>

    </div>
  </div>


  <div className="grid grid-cols-3 gap-14 p-10 h-40">
      <div className="bg-card-orange shadow-lg ">
        <div className="w-full h-64 bg-notebook bg-cover bg-center" ></div>
        <div className="h-60 flex-col p-4 items-center">
          <p className="text-lg font-semibold px-8 py-6">Detailed Notes and Reviews</p>
          <p className="text-text-color px-8 py-4">Write comprehensive notes and reviews about your visited places. Share your insights, tips, and memorable experiences, or simply keep a diary of your adventures.</p>
        </div>
      </div>

      <div className="bg-card-orange shadow-lg">
        <div className="w-full h-64 bg-leather-notebook bg-cover bg-center"></div>
        <div className="h-60 flex-col p-4 items-center">
          <p className="text-lg font-semibold px-8 py-6"> Image Gallery View</p>
          <p className="text-text-color px-8 py-4">Swipe through your travel memories like a visual storybook, providing a delightful experience.</p>
        </div>
      </div>

      <div className="bg-card-orange shadow-lg">
        <div className="w-full h-64 bg-world bg-cover bg-center" ></div>
        <div className="h-60 flex-col p-4 items-center">
          <p className="text-lg font-semibold px-8 py-6">Geotagged Photos</p>
          <p className="text-text-color px-8 py-4">Automatically geotag your photos with the exact location where they were taken. It's the perfect way to associate your pictures with specific places on your map.</p>
        </div>
      </div>
</div>

<div class="border-y-2 items-center border-black w-full py-20 pl-10 flex justify-between">
<div className="text-logo-color text-4xl font-extrabold items-center">Travelog</div>
<div className="flex gap-20 pl-10 pr-10">
  <div>
    <p className="font-bold text-xl tracking-wider text-logo-color pb-6">About Us

</p>
    <p className="w-[15rem]"> Learn more about our app's mission, values, and the team behind it. </p>
  </div>
  <div>
    <p className="font-bold text-xl tracking-wider text-logo-color pb-6">Careers</p>
    <p className="w-[15rem]">Explore opportunities to join our team. </p>
  </div>
  <div>
    <p className="font-bold text-xl tracking-wider text-logo-color pb-6 ">FAQ</p>
    <p className="w-[15rem]">Find answers to frequently asked questions about our app. </p>
  </div>
</div>
</div>

    
    </main>;
}
