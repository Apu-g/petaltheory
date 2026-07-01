import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, productName, price } = body;

    // Validate inputs
    if (!name || name.length < 2) {
      return Response.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return Response.json(
        { error: 'Please enter a valid 10-digit Indian phone number' },
        { status: 400 }
      );
    }

    if (!productName) {
      return Response.json(
        { error: 'Product name is required' },
        { status: 400 }
      );
    }

    const enquiryData = {
      customer_name: name,
      customer_phone: phone,
      product_name: productName,
      product_price: price,
      status: 'new',
    };

    // Log enquiry cleanly on server console
    console.log(`\n🌸 NEW ENQUIRY CAPTURED:`);
    console.log(`Customer: ${name} (${phone})`);
    console.log(`Product: ${productName} (₹${price})\n`);

    let savedEnquiry = {
      id: Date.now().toString(),
      ...enquiryData,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('enquiries')
        .insert([enquiryData])
        .select()
        .single();

      if (!error && data) {
        savedEnquiry = data;
      } else if (error) {
        console.warn('Supabase enquiry insert warning:', error.message);
      }
    }

    return Response.json({
      success: true,
      enquiry: savedEnquiry,
      message: 'Your enquiry has been received! We will call you shortly.',
    });
  } catch (error) {
    console.error('Enquiry API error:', error);
    return Response.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
