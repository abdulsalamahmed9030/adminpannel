import Image from 'next/image';
import fs from 'fs';
import path from 'path';

type ContentData = {
  imageUrl: string;
  description: string;
};

export default function ImgContent() {
  const contentPath = path.join(process.cwd(), 'content', 'imgcontent.json');
  const fileContent = fs.readFileSync(contentPath, 'utf-8');
  const content: ContentData = JSON.parse(fileContent);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <Image
          src={content.imageUrl}
          alt="Dynamic Content"
          width={600}
          height={400}
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">About This Section</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {content.description}
        </p>
      </div>
    </div>
  );
}
